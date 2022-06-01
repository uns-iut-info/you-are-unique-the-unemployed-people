// Rely on ./css/mainmenu.css"
export abstract class GameUi {
  private static _questSection: HTMLElement;
  private static _questName: HTMLElement;
  private static _questDistance: HTMLElement;

  private static _playerSection: HTMLElement;
  private static _playerHealthValue: HTMLElement;
  private static _playerLevel: HTMLElement;

  private static _enemySection: HTMLElement;
  private static _enemyName: HTMLElement;
  private static _enemySubName: HTMLElement;
  private static _enemyLevel: HTMLElement;
  private static _enemyHealthValue: HTMLElement;

  private static _gameOverSection: HTMLElement;
  private static _gameOverButton: HTMLElement;
  private static _playerHealthText: HTMLElement;

  private static _dialogSection: HTMLElement;
  private static _dialogText: HTMLElement;

  private static _created: boolean;

  public static get initialized() {
    return this._created;
  }

  public static questEnabled(state: boolean) {
    if (state) this._questSection.classList.remove("disable");
    else this._questSection.classList.add("disable");
  }

  public static setQuestName(name: string) {
    this._questName.innerText = name;
  }

  public static setDistance(distance: number) {
    this._questDistance.innerText = distance + " m";
  }

  public static playerInfoEnabled(state: boolean) {
    if (state) this._playerSection.classList.remove("disable");
    else this._playerSection.classList.add("disable");
  }

  public static setPlayerHealth(health: number, maxHealth: number) {
    this._playerHealthValue.style.width = (health / maxHealth) * 100 + "%";
    this._playerHealthText.innerText = health + " / " + maxHealth;
  }

  public static setPlayerLevel(level: number) {
    this._playerLevel.innerText = "Lvl " + level;
  }

  public static enemyInfoEnabled(state: boolean) {
    if (state) this._enemySection.classList.remove("disable");
    else this._enemySection.classList.add("disable");
  }

  public static setEnemyName(name: string) {
    this._enemyName.innerText = name;
  }

  public static setEnemySubName(subname: string) {
    this._enemySubName.innerText = subname;
  }

  public static setEnemyLevel(level: number) {
    this._enemyLevel.innerText = level + " Lvl";
  }

  public static setEnemyHealth(health: number, maxHealth: number) {
    this._enemyHealthValue.style.width = (health / maxHealth) * 100 + "%";
  }

  public static gameOverEnabled(state: boolean) {
    if (state) this._gameOverSection.classList.add("gameover_gu");
    else this._gameOverSection.classList.remove("gameover_gu");
    if (state) this._gameOverButton.classList.remove("disable");
    else this._gameOverButton.classList.add("disable");
  }

  public static dialogSectionEnabled(state: boolean) {
    if (state) this._dialogSection.classList.remove("disable");
    else this._dialogSection.classList.add("disable");
  }

  public static setDialogText(text: string) {
    this._dialogText.innerText = text;
  }

  public static getGameOverButton(): HTMLElement {
    return this._gameOverButton;
  }

  public static createUi() {
    this.createBackground();
    this._created = true;
  }

  private static createBackground() {
    document.body.appendChild(this.enemyHealthBar());
    document.body.appendChild(this.playerHealthBar());
    document.body.appendChild(this.quest());
    document.body.appendChild(this.gameover());
    document.body.appendChild(this.dialog());
  }

  private static enemyHealthBar() {
    this._enemySection = document.createElement("div");
    this._enemySection.classList.add("enemy_info_gu");
    this._enemyName = document.createElement("p");
    this._enemyName.classList.add("enemy_name_gu");
    this._enemyName.innerText = "Monster of Madness";
    this._enemySubName = document.createElement("p");
    this._enemySubName.innerText = "Storminder";
    this._enemySubName.classList.add("enemy_sub_name_gu");
    const enemyHealthSection = document.createElement("div");
    enemyHealthSection.classList.add("enemy_health_section_gu");
    const enemyHealth = document.createElement("div");
    enemyHealth.classList.add("enemy_health_gu");
    this._enemyHealthValue = document.createElement("div");
    this._enemyHealthValue.classList.add("enemy_health_value_gu");
    this._enemyLevel = document.createElement("p");
    this._enemyLevel.classList.add("enemy_level_gu");
    this._enemyLevel.innerText = "15 Lvl";

    enemyHealth.appendChild(this._enemyHealthValue);
    this._enemySection.appendChild(this._enemyName);
    this._enemySection.appendChild(this._enemySubName);
    this._enemySection.appendChild(enemyHealthSection);
    enemyHealthSection.appendChild(this._enemyLevel);
    enemyHealthSection.appendChild(enemyHealth);
    return this._enemySection;
  }

  private static playerHealthBar() {
    this._playerSection = document.createElement("div");
    this._playerSection.classList.add("player_info_gu");
    const playerHealth = document.createElement("div");
    playerHealth.classList.add("player_health_gu");
    this._playerHealthValue = document.createElement("div");
    this._playerHealthValue.classList.add("player_health_value_gu");
    this._playerLevel = document.createElement("p");
    this._playerLevel.classList.add("player_level_gu");
    this._playerLevel.innerText = "15 Lvl";

    this._playerHealthText = document.createElement("p");
    this._playerHealthText.classList.add("player_health_text");
    this._playerHealthText.innerText = "100 / 500";

    playerHealth.appendChild(this._playerHealthValue);
    playerHealth.appendChild(this._playerHealthText);
    this._playerSection.appendChild(this._playerLevel);
    this._playerSection.appendChild(playerHealth);
    return this._playerSection;
  }

  private static quest() {
    this._questSection = document.createElement("div");
    this._questSection.classList.add("quest_gu");
    const questImage = document.createElement("img");
    questImage.classList.add("quest_image_gu");
    questImage.src = "../img/icon19.png";
    const questInfo = document.createElement("div");
    questInfo.classList.add("quest_info_gu");
    this._questName = document.createElement("p");
    this._questName.classList.add("quest_name_gu");
    this._questName.innerText = "Defeat the creature";
    this._questDistance = document.createElement("p");
    this._questDistance.classList.add("quest_distance_gu");
    this._questDistance.innerText = "15 m";
    questInfo.appendChild(this._questName);
    questInfo.appendChild(this._questDistance);

    this._questSection.appendChild(questImage);
    this._questSection.appendChild(questInfo);
    return this._questSection;
  }

  private static gameover() {
    this._gameOverSection = document.createElement("div");
    const gameOverText = document.createElement("p");
    gameOverText.innerText = "Game Over";
    this._gameOverButton = document.createElement("button");
    this._gameOverButton.classList.add("gameover_button_gu");
    this._gameOverButton.classList.add("disable");
    this._gameOverButton.innerText = "Respawn";
    this._gameOverSection.appendChild(this._gameOverButton);
    this._gameOverSection.appendChild(gameOverText);
    return this._gameOverSection;
  }

  private static dialog() {
    this._dialogSection = document.createElement("div");
    this._dialogSection.classList.add("dialog_section");
    this._dialogText = document.createElement("p");
    this._dialogText.innerText = "Hello";

    this._dialogSection.appendChild(this._dialogText);
    return this._dialogSection;
  }

  public static dispose() {
    this._enemySection.remove();
    this._playerSection.remove();
    this._questSection.remove();
    this._gameOverSection.remove();
    this._dialogSection.remove();
    this._created = false;
  }
}
