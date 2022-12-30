import { CustomComponent } from "../CustomComponent.js";

export class ZoomImage extends CustomComponent {
  private backgroundImage: string;
  private backgroundPosition: string;
  private defaultSrc: string;
  private figure: HTMLElement;
  private image: HTMLImageElement;
  private lastTouch: Touch | undefined;

  constructor() {
    super({ mode: "closed" });
    this.backgroundImage = "";
    this.backgroundPosition = "0% 0%";
    this.defaultSrc =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgVHJhbnNmb3JtZWQgYnk6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyBoZWlnaHQ9IjgwMHB4IiB3aWR0aD0iODAwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIA0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTQ2NS40NTUsMTUxLjI3NmgtNTEuNzkzbC0yNDAsMjU2aDI5MS43OTNjMTIuODU4LDAsMjMuMjczLTEwLjQxNSwyMy4yNzMtMjMuMjczVjE3NC41NDkNCgkJQzQ4OC43MjcsMTYxLjY5MSw0NzguMzEzLDE1MS4yNzYsNDY1LjQ1NSwxNTEuMjc2eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDYuNTQ1LDQwNy4yNzZjLTEyLjgzNSwwLTIzLjI3My0xMC40MzgtMjMuMjczLTIzLjI3M1YxNzQuNTQ5DQoJCWMwLTEyLjgzNSwxMC40MzgtMjMuMjczLDIzLjI3My0yMy4yNzNoMTA0LjcyN2M0LjA4NCwwLDcuODc4LTIuMTQxLDkuOTcyLTUuNjQ0TDE4OS4zNyw5OC43NWMyLjA5NS0zLjQ3OSw1LjkxMS01LjY0NCw5Ljk3Mi01LjY0NA0KCQloMTEzLjI4YzQuMDYxLDAsNy44ODksMi4xNjQsOS45NzIsNS42NTVsMjguMTI1LDQ2Ljg4M2MwLjU3LDAuOTQzLDEuMjgsMS43NjksMi4wNiwyLjUwMmwtMjQyLjkwOSwyNTkuMTNINDYuNTQ1eiIvPg0KPC9nPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzcyQzZFRjsiIGQ9Ik0yMTQuNDU4LDM2My43NjhjMTIuNzQyLDUuNTE2LDI2Ljc3NSw4LjU5OSw0MS41NDIsOC41OTljNTcuODQ0LDAsMTA0LjcyNy00Ni44ODMsMTA0LjcyNy0xMDQuNzI3DQoJCWMwLTE3LjE2NC00LjIxMi0zMy4zMTUtMTEuNTItNDcuNjA0TDIxNC40NTgsMzYzLjc2OHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojNzJDNkVGOyIgZD0iTTI1NiwxNjIuOTEzYy01Ny44NDQsMC0xMDQuNzI3LDQ2Ljg4My0xMDQuNzI3LDEwNC43MjdjMCwzMC4zMjQsMTIuOTYzLDU3LjU1MywzMy41NzEsNzYuNjg0DQoJCWwxNDMuMTA0LTE1Mi42NDZDMzA5LjE3OCwxNzMuODg2LDI4My44OTIsMTYyLjkxMywyNTYsMTYyLjkxM3ogTTI1NiwyMjEuMDk1Yy0yNS42NywwLTQ2LjU0NSwyMC44NzYtNDYuNTQ1LDQ2LjU0NQ0KCQljMCw2LjQyMy01LjIxMywxMS42MzYtMTEuNjM2LDExLjYzNmMtNi40MjMsMC0xMS42MzYtNS4yMTMtMTEuNjM2LTExLjYzNmMwLTM4LjUwNSwzMS4zMTMtNjkuODE4LDY5LjgxOC02OS44MTgNCgkJYzYuNDIzLDAsMTEuNjM2LDUuMjEzLDExLjYzNiwxMS42MzZDMjY3LjYzNiwyMTUuODgxLDI2Mi40MjMsMjIxLjA5NSwyNTYsMjIxLjA5NXoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMwMDM4NEU7IiBkPSJNMzg0LDIwOS40NThjMCw2LjQyMyw1LjIxMywxMS42MzYsMTEuNjM2LDExLjYzNmg1OC4xODJjNi40MjMsMCwxMS42MzYtNS4yMTMsMTEuNjM2LTExLjYzNg0KCQl2LTIzLjI3M2MwLTYuNDIzLTUuMjEzLTExLjYzNi0xMS42MzYtMTEuNjM2aC01OC4xODJjLTYuNDIzLDAtMTEuNjM2LDUuMjEzLTExLjYzNiwxMS42MzZWMjA5LjQ1OHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMDAzODRFOyIgZD0iTTI1NiwzNjAuNzMxYy0xMS42MTMsMC0yMi42OTEtMi4yMzQtMzIuOTQzLTYuMTMybC0xNi45MDgsMTguMDI1DQoJCWMxNS4xMzksNy4yMTUsMzIsMTEuMzgsNDkuODUsMTEuMzhjNjQuMTYzLDAsMTE2LjM2NC01Mi4yMDEsMTE2LjM2NC0xMTYuMzY0YzAtMjAuNTI3LTUuMzg4LTM5Ljc5Ni0xNC43NTUtNTYuNTY0bC0xNi45NDMsMTguMDcxDQoJCWM1LjM1MywxMS43NTMsOC40MjUsMjQuNzYyLDguNDI1LDM4LjQ5M0MzNDkuMDkxLDMxOC45NjgsMzA3LjMyOCwzNjAuNzMxLDI1NiwzNjAuNzMxeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMwMDM4NEU7IiBkPSJNNDY1LjQ1NSwxMjguMDA0aC0yOS45NzVsLTIxLjgxOCwyMy4yNzNoNTEuNzkzYzEyLjgzNSwwLDIzLjI3MywxMC40MzgsMjMuMjczLDIzLjI3M3YyMDkuNDU1DQoJCWMwLDEyLjgzNS0xMC40MzgsMjMuMjczLTIzLjI3MywyMy4yNzNIMTczLjY2MWwtMjEuODE4LDIzLjI3M2gzMTMuNjEyYzI1LjY3LDAsNDYuNTQ1LTIwLjg3Niw0Ni41NDUtNDYuNTQ1VjE3NC41NDkNCgkJQzUxMiwxNDguODc5LDQ5MS4xMjQsMTI4LjAwNCw0NjUuNDU1LDEyOC4wMDR6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzAwMzg0RTsiIGQ9Ik00NTAuMTQxLDYxLjMzOWMtNC42ODktNC40MS0xMi4wNjctNC4xNzctMTYuNDU0LDAuNTI0bC02Mi4wMSw2Ni4xNDFoLTQuMzY0bC0yNC43MzktNDEuMjI4DQoJCWMtNi4yNzItMTAuNDYxLTE3LjczNC0xNi45NTQtMjkuOTI5LTE2Ljk1NGgtMTEzLjI4Yy0xMi4xOTUsMC0yMy42NjgsNi40OTMtMjkuOTI5LDE2Ljk1NGwtMjQuNzM5LDQxLjIyOEg0Ni41NDUNCgkJQzIwLjg3NiwxMjguMDA0LDAsMTQ4Ljg3OSwwLDE3NC41NDl2MjA5LjQ1NWMwLDI1LjY3LDIwLjg3Niw0Ni41NDUsNDYuNTQ1LDQ2LjU0NWg0MS41MDdsLTMuNDQ0LDMuNjc3DQoJCWMtNC4zOTksNC42ODktNC4xNTQsMTIuMDU1LDAuNTI0LDE2LjQ1NGMyLjI0NiwyLjEwNiw1LjEwOCwzLjE0Miw3Ljk1OSwzLjE0MmMzLjEwNywwLDYuMjAyLTEuMjMzLDguNDgzLTMuNjc3TDQ1MC42NjUsNzcuNzgxDQoJCUM0NTUuMDYzLDczLjA5Miw0NTQuODMxLDY1LjcyNiw0NTAuMTQxLDYxLjMzOXogTTQ2LjU0NSw0MDcuMjc2Yy0xMi44MzUsMC0yMy4yNzMtMTAuNDM4LTIzLjI3My0yMy4yNzNWMTc0LjU0OQ0KCQljMC0xMi44MzUsMTAuNDM4LTIzLjI3MywyMy4yNzMtMjMuMjczaDEwNC43MjdjNC4wODQsMCw3Ljg3OC0yLjE0MSw5Ljk3Mi01LjY0NEwxODkuMzcsOTguNzVjMi4wOTUtMy40NzksNS45MTEtNS42NDQsOS45NzItNS42NDQNCgkJaDExMy4yOGM0LjA2MSwwLDcuODg5LDIuMTY0LDkuOTcyLDUuNjU1bDI4LjEyNSw0Ni44ODNjMC41NywwLjk0MywxLjI4LDEuNzY5LDIuMDYsMi41MDJsLTI1LjgyMSwyNy41NDMNCgkJQzMwNy4zNCwxNjAuNDM0LDI4Mi43NCwxNTEuMjc2LDI1NiwxNTEuMjc2Yy02NC4xNjMsMC0xMTYuMzY0LDUyLjIwMS0xMTYuMzY0LDExNi4zNjRjMCwyOS40NCwxMS4wNTUsNTYuMjg1LDI5LjE2MSw3Ni43NzcNCgkJbC01OC45MjcsNjIuODZINDYuNTQ1eiBNMzEwLjk3LDE5Mi43NkwxODQuODMyLDMyNy4zYy0xMy42MDMtMTYuMTYzLTIxLjkyMy0zNi45MTEtMjEuOTIzLTU5LjY2DQoJCWMwLTUxLjMyOCw0MS43NjMtOTMuMDkxLDkzLjA5MS05My4wOTFDMjc2LjU5NiwxNzQuNTQ5LDI5NS41NTIsMTgxLjM5MSwzMTAuOTcsMTkyLjc2eiIvPg0KPC9nPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZBQTg1RjsiIGQ9Ik05My4wOTEsMzk1LjY0SDQ2LjU0NWMtNi40MjMsMC0xMS42MzYtNS4yMTMtMTEuNjM2LTExLjYzNlYxNzQuNTQ5DQoJYzAtNi40MjMsNS4yMTMtMTEuNjM2LDExLjYzNi0xMS42MzZoNDYuNTQ1YzYuNDIzLDAsMTEuNjM2LDUuMjEzLDExLjYzNiwxMS42MzZ2MjA5LjQ1NQ0KCUMxMDQuNzI3LDM5MC40MjcsOTkuNTE0LDM5NS42NCw5My4wOTEsMzk1LjY0eiIvPg0KPC9zdmc+";
    this.figure = document.createElement("figure");
    this.image = new Image();
    this.image.src = this.defaultSrc;
    this.lastTouch = undefined;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  setComponentAttributes(): void {
    const attributesMapping = [
      {
        key: "image",
        value: this.defaultSrc,
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
    this.image = this.shadowDOM.querySelector("#primaryImage") || this.image;
    this.backgroundImage = `url(${
      this.attributes.getNamedItem("image")?.value
    })`;
  }

  addListeners() {
    this.figure.addEventListener("mousemove", this.handleMouseMove, true);
    this.figure.addEventListener("mouseout", this.handleMouseOut, true);
    this.figure.addEventListener("touchstart", this.handleTouchStart, true);
    this.figure.addEventListener("touchmove", this.handleTouchMove, true);
    this.figure.addEventListener("touchend", this.handleTouchEnd, true);
  }

  handleMouseMove(ev: MouseEvent) {
    if (!ev) return;
    if (!ev.target) return;
    const { left, top, width, height } = (
      ev.target as Element
    ).getBoundingClientRect();
    const x = ((ev.pageX - left) / width) * 100;
    const y = ((ev.pageY - top) / height) * 100;
    this.image.style.opacity = "0";
    this.backgroundPosition = `${x}% ${y}%`;
    this.figure.style.backgroundImage = this.backgroundImage;
    this.figure.style.backgroundPosition = this.backgroundPosition;
  }

  handleMouseOut(ev: Event) {
    this.figure.style.backgroundImage = "";
    this.figure.style.backgroundPosition = "0% 0%";
    this.image.style.opacity = "1";
  }

  handleTouchStart(ev: TouchEvent) {
    if (ev.cancelable) ev.preventDefault();
    const touch = ev.touches[0];
    this.lastTouch = touch;
    this.dispatchMouseEvent({
      touch,
      type: "mouseover",
      element: this.figure,
    });
  }

  handleTouchMove(ev: TouchEvent) {
    if (ev.cancelable) ev.preventDefault();
    const touch = ev.touches[0];
    this.lastTouch = touch;
    this.dispatchMouseEvent({
      touch,
      type: "mousemove",
      element: this.figure,
    });
  }

  handleTouchEnd(ev: TouchEvent) {
    if (ev.cancelable) ev.preventDefault();
    this.dispatchMouseEvent({
      touch: this.lastTouch,
      type: "mouseout",
      element: this.figure,
    });
  }

  dispatchMouseEvent(props: {
    touch: Touch | undefined;
    type: string;
    element: HTMLElement;
  }) {
    const { touch, type, element } = props;
    const options = !this.isEmpty(touch)
      ? { clientX: touch?.clientX, clientY: touch?.clientY }
      : touch;
    element.dispatchEvent(new MouseEvent(type, options));
  }

  isEmpty(value: undefined | null | string | object) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
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
