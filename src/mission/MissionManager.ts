import { AbstractMesh, float, MeshBuilder, Vector3 } from "@babylonjs/core";
import { App } from "../app";
import { HitpointComponent } from "../core/components/HitpointComponent";
import { DataTables } from "../data/DataTables";
import { GoToAnchorPointMissionData, IMissionData, KillMonsterMissionData, TextMissionData, TransitionMissionData } from "../data/IMissionData";
import { BaseScene } from "../scene/BaseScene";
import { GameUi } from "../ui/GameUi";

export class MissionManager {
    private static _currentMission: IMissionData = DataTables.MISSIONS.start;
    private static _time: float = 0;

    private static _pathMesh: AbstractMesh;
    private static _pathMeshLifetime: float = 0;

    public static get currentMission(): IMissionData {
        return this._currentMission;
    }

    public static update(deltaTime: float): void {
        if (!GameUi.initialized || !this._currentMission) {
            return;
        }

        const scene = App.getScene() as BaseScene;
        const sceneType = scene.sceneType;

        if (sceneType !== this._currentMission.scene) {
            return;
        }

        this._time += deltaTime;

        if (this._currentMission instanceof TextMissionData) {
            GameUi.dialogSectionEnabled(true);
            GameUi.setDialogText(this._currentMission.text);

            if (this._time > this._currentMission.duration) {
                this._startNextMission();
            }
        } else if (this._currentMission instanceof GoToAnchorPointMissionData) {
            const anchor = scene.getAnchorByName(this._currentMission.name);

            this._pathMeshLifetime += deltaTime;

            if (this._pathMeshLifetime > 1000) {
                this._pathMesh.dispose();
                this._pathMesh = null;
                this._pathMeshLifetime = 0;

                console.log("Path mesh lifetime expired");

                this._generatePathMesh(anchor.position);
            }

            const distance = scene.player.position.subtract(anchor.position).length() / 2;

            if (distance < 1) {
                this._startNextMission();
            } else {
                GameUi.setDistance(Math.floor(distance));
            }
        } else if (this._currentMission instanceof KillMonsterMissionData) {
            const monster = scene.getGameObjectByExportName(this._currentMission.name);
        
            if (!monster || !monster.getComponent(HitpointComponent).alive) {
                this._startNextMission();
            } else {
                const distance = scene.player.position.subtract(monster.position).length() / 2;

                GameUi.setDistance(Math.floor(distance));
            }
        } else if (this._currentMission instanceof TransitionMissionData) {
            this._startNextMission();
        }
    }

    private static _startNextMission() {
        if (this._pathMesh) {
            this._pathMesh.dispose();
            this._pathMesh = null;
            this._pathMeshLifetime = 0;
        }

        GameUi.questEnabled(false);
        GameUi.dialogSectionEnabled(false);
        GameUi.setDialogText('');

        const nextMissionName = this._currentMission.next;
        this._currentMission = nextMissionName ? DataTables.MISSIONS[nextMissionName] || null : null;
        this._time = 0;

        if (this._currentMission) {
            console.log("Starting mission: " + nextMissionName);

            if (this._currentMission instanceof GoToAnchorPointMissionData) {
                GameUi.questEnabled(true);
                GameUi.setQuestName(this._currentMission.displayName);

                const scene = App.getScene() as BaseScene;
                const anchor = scene.getAnchorByName(this._currentMission.name);

                if (!anchor) {
                    throw new Error("Anchor not found: " + this._currentMission.name);
                }

                this._generatePathMesh(anchor.position);
            } else if (this._currentMission instanceof KillMonsterMissionData) {
                GameUi.questEnabled(true);
                GameUi.setQuestName(this._currentMission.displayName);
            } else if (this._currentMission instanceof TransitionMissionData) {
                GameUi.questEnabled(true);
                GameUi.setQuestName(this._currentMission.displayName);
            }
        }
    }

    private static _generatePathMesh(anchor: Vector3): void {
        const scene = App.getScene() as BaseScene;
        const start = scene.player.position;
        const end = anchor;

        const paths = scene.navMeshService.findPath(start, end);

        if (paths && paths.length > 0) {
            for (const path of paths) {
                path.y += 1;
            }

            const pathMesh = MeshBuilder.CreateDashedLines('path', {
                points: paths,
                dashSize: 2,
                gapSize: 2,
                
            });

            pathMesh.isVisible = true;
            this._pathMesh = pathMesh;
            this._pathMeshLifetime = 0;
        }
    }
}