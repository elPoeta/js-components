import { CustomComponent } from "../CustomComponent.js";

export class Chart extends CustomComponent {
  constructor() {
    super({ mode: "closed" });
  }

  setComponentAttributes(): void {}

  initComponent(): void {}

  htmlTemplate(): string {
    return `
      <canvas></canvas>
    `;
  }
  cssTemplate(): string {
    return `
    <style>
      canvas  {
        width: 300px;
        height: 300px;
        border: 1px solid #777;
      }  
    </style>
    `;
  }
}
