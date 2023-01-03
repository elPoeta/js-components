/** @type {HTMLCanvasElement} */
import { CustomComponent } from "../CustomComponent.js";

type ChartData = {
  name: string;
  value: number;
};
export class Chart extends CustomComponent {
  private dataValues: ChartData[];
  private total: number;
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null;

  constructor() {
    super({ mode: "closed" });
    this.dataValues = [];
    this.canvas = null;
    this.ctx = null;
    this.total = 0;
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
    ) as ChartData[];

    this.total = this.dataValues.reduce((accumulator, chartData) => {
      return accumulator + chartData.value;
    }, 0);

    this.initCanvasContext();
    this.draw();
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
        border: 1px solid #777;
      }  
    </style>
    `;
  }

  initCanvasContext(): void {
    this.canvas = this.shadowDOM.querySelector("canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
  }

  draw(): void {
    if (!this.canvas) return;
    if (!this.ctx) return;
    this.canvas.width = +this.attributes.getNamedItem("width")!.value;
    this.canvas.height = +this.attributes.getNamedItem("height")!.value;
    let startAngle = 0;
    let radius = 100;
    let cx = this.canvas.width / 2;
    let cy = this.canvas.height / 2;

    this.dataValues.forEach((data) => {
      this.ctx!.fillStyle = this.randomHexColorCode();
      this.ctx!.lineWidth = 1;
      this.ctx!.strokeStyle = "#333";
      this.ctx!.beginPath();

      let endAngle = (data.value / this.total) * Math.PI * 2 + startAngle;
      this.ctx!.moveTo(cx, cy);
      this.ctx!.arc(cx, cy, radius, startAngle, endAngle, false);
      this.ctx!.lineTo(cx, cy);
      this.ctx!.fill();
      this.ctx!.stroke();
      this.ctx!.closePath();

      this.ctx!.beginPath();
      this.ctx!.font = "20px Helvetica, Calibri";
      this.ctx!.textAlign = "center";
      this.ctx!.fillStyle = "rebeccapurple";

      let theta = (startAngle + endAngle) / 2;
      let deltaY = Math.sin(theta) * 1.5 * radius;
      let deltaX = Math.cos(theta) * 1.5 * radius;

      this.ctx!.fillText(data.name, deltaX + cx, deltaY + cy);
      this.ctx!.closePath();

      startAngle = endAngle;
    });
  }

  randomHexColorCode(): string {
    return "#" + Math.random().toString(16).slice(2, 8);
  }
}
