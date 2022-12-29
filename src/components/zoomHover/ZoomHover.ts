import { CustomComponent } from "../CustomComponent";

export class ZoomHover extends CustomComponent {
  constructor() {
    super({ mode: "closed" });
  }

  setComponentAttributes(): void {
    throw new Error("Method not implemented.");
  }

  render(): void {
    throw new Error("Method not implemented.");
  }

  initComponent(): void {
    throw new Error("Method not implemented.");
  }

  htmlTemplate(): string {
    return ``;
  }

  cssTemplate(): string {
    return ``;
  }
}
