import { CustomComponent } from "../CustomComponent.js";

export class ZoomImage extends CustomComponent {
  private backgroundImage: string;
  private backgroundPosition: string;
  private figure: HTMLElement;

  constructor() {
    super({ mode: "closed" });
    this.backgroundImage = "";
    this.backgroundPosition = "0% 0%";
    this.figure = document.createElement("figure");
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  setComponentAttributes(): void {
    const attributesMapping = [
      {
        key: "image",
        value:
          "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      },
      { key: "height", value: "400" },
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
    this.initImage();
    this.addListeners();
  }

  initImage() {
    this.figure =
      this.shadowDOM.querySelector(".zoom-img") ||
      document.createElement("figure");
    this.backgroundImage = `url(${
      this.attributes.getNamedItem("image")?.value
    })`;
  }

  addListeners() {
    this.figure.addEventListener("mousemove", this.handleMouseMove);
    this.figure.addEventListener("mouseout", this.handleMouseOut);
  }

  handleMouseMove(ev: MouseEvent) {
    if (!ev) return;
    if (!ev.target) return;
    const { left, top, width, height } = (
      ev.target as Element
    ).getBoundingClientRect();
    const x = ((ev.pageX - left) / width) * 100;
    const y = ((ev.pageY - top) / height) * 100;
    this.backgroundPosition = `${x}% ${y}%`;
    this.figure.style.backgroundImage = this.backgroundImage;
    this.figure.style.backgroundPosition = this.backgroundPosition;
  }

  handleMouseOut(ev: Event) {
    this.figure.style.backgroundImage = "";
    this.figure.style.backgroundPosition = "0% 0%";
  }

  htmlTemplate(): string {
    return `
      <figure class="tumb zoom-img">
        <img id="primaryImage" src='${
          this.attributes.getNamedItem("image")?.value
        }' alt="not found" />
      </figure>`;
  }

  cssTemplate(): string {
    return `
    <style>
     .zoom-img {
       background-repeat: no-repeat;
       height: ${this.attributes.getNamedItem("height")?.value}px;
       width: max-content;
     }
    .zoom-img:hover img {
      opacity: 0;
      cursor: zoom-in;
    }
    .tumb {
      align-items: center;
      justify-content: center;
      padding:1px;
    }
    .tumb img {
      max-width: 100%;
      max-height: 100%;
    }
   </style>`;
  }
}
