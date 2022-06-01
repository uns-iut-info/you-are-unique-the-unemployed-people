// Rely on ./css/mainmenu.css"
export abstract class MainMenu {
  private static _root: HTMLElement;
  private static _playButton: HTMLButtonElement;

  public static createUi() {
    this.createBackground();
  }

  private static createBackground() {
    const background = document.createElement("div");
    background.classList.add("background_mm");
    const header = document.createElement("div");
    header.classList.add("header_mm");
    const title = document.createElement("h1");
    title.classList.add("titlemain_mm");
    title.innerText = "ソードトーナメント・オンライン III";

    const content = document.createElement("div");
    content.classList.add("content_mm");

    const but0 = document.createElement("button");
    but0.classList.add("button_menu_mm");
    but0.innerText = "Jouer";

    const but1 = document.createElement("button");
    but1.classList.add("button_menu_mm");
    but1.innerText = "Quitter";

    const group = document.createElement("div");
    group.classList.add("group_but_mm");

    const footer = document.createElement("div");
    footer.classList.add("footer_mm");

    const version = document.createElement("p");
    version.classList.add("version_mm");
    version.innerText = "Version r12.45.97aa";

    header.appendChild(title);
    group.appendChild(but0);
    group.appendChild(but1);
    content.appendChild(group);
    footer.appendChild(version);
    background.appendChild(header);
    background.appendChild(content);
    background.appendChild(footer);
    document.body.appendChild(background);

    this._root = background;
    this._playButton = but0;
  }

  public static dispose() {
    this._root.remove();

    this._root = null;
    this._playButton = null;
  }

  public static getPlayButton(): HTMLButtonElement {
    return this._playButton;
  }
}
