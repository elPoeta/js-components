import { CustomComponent } from "../CustomComponent.js";

export class Chart extends CustomComponent {
  private dataValues: any[];

  constructor() {
    super({ mode: "closed" });
    this.dataValues = [];
  }

  setComponentAttributes(): void {
    const attributesMapping = [
      { key: "width", value: "600" },
      { key: "height", value: "300" },
      { key: "values", value: "[]" },
    ];
    attributesMapping.forEach((attrMap) => {
      if (
        !this.attributes.getNamedItem(attrMap.key) ||
        this.attributes.getNamedItem(attrMap.key)?.value === ""
      ) {
        const attr = document.createAttribute(attrMap.key);
        attr.value = attrMap.value;
        this.attributes.setNamedItem(attr);
      }
    });
  }

  initComponent(): void {
    this.dataValues = JSON.parse(
      this.attributes.getNamedItem("values")!.value
    ) as any[];
  }

  htmlTemplate(): string {
    return `
      <canvas></canvas>
    `;
  }
  cssTemplate(): string {
    return `
    <style>
      canvas  {
        width: ${this.attributes.getNamedItem("width")!.value}px;
        height: ${this.attributes.getNamedItem("height")!.value}px;
        border: 1px solid #777;
      }  
    </style>
    `;
  }
}
