namespace Serializer {
    export interface IJSONSerializable {
        serialize(): JSONNode;
        deserialize(json: JSONNode): void;
    }

    export class JSONSerializer {
        serialize(obj: IJSONSerializable): JSONNode {
            return obj.serialize();
        }
        deserialize(json: JSONNode, obj: IJSONSerializable): void {
            obj.deserialize(json);
        }
    }

    export class JSONNode {

    }

    export class JSONObject {
        private _data: { [key: string]: JSONNode };

        constructor(data?: { [key: string]: JSONNode }) {
            this._data = data || {};
        }

        get<T extends JSONNode>(key: string): T {
            return this._data[key] as T;
        }

        add(key: string, value: JSONNode): void {
            this._data[key] = value;
        }

        remove(key: string): void {
            delete this._data[key];
        }

        keys(): string[] {
            return Object.keys(this._data);
        }
    }

    export class JSONArray {
        private _data: JSONNode[];

        constructor(data?: JSONNode[]) {
            this._data = data || [];
        }

        get<T extends JSONNode>(key: number): T {
            return this._data[key] as T;
        }

        add(value: JSONNode): void {
            this._data.push(value);
        }

        remove(key: number): void {
            this._data.splice(key, 1);
        }

        get size(): number {
            return this._data.length;
        }
    }

    export class JSONString {
        constructor(public value: string) {

        }
    }

    export class JSONNumber {
        constructor(public value: number) {

        }
    }

    export class JSONBoolean {
        constructor(public value: boolean) {

        }
    }

    export class JSONNull {
            
    }
}