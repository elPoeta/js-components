import { CustomComponent } from "../CustomComponent.js";

export class GlitchButton extends CustomComponent {
  private button: HTMLButtonElement | null;

  constructor() {
    super({ mode: "closed" });
    this.button = null;
    this.handleClick = this.handleClick.bind(this);
  }

  setComponentAttributes() {
    const attributesMapping = [
      { key: "text", value: "button" },
      { key: "color", value: "#ffc107" },
      { key: "bg", value: "#1f3c5f" },
      { key: "w", value: "300px" },
      { key: "h", value: "65px" },
      { key: "fs", value: "35px" },
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
    // const attrs = Object.fromEntries(
    //   Array.from(this.attributes).map((item) => [item.name, item.value])
    // );
  }

  initComponent() {
    this.button = this.shadowDOM.querySelector("button");
    this.button?.addEventListener("click", this.handleClick);
  }

  handleClick(ev: Event) {
    console.log(ev.target);
  }

  htmlTemplate(): string {
    const textValue = this.attributes.getNamedItem("text")?.value;
    return `<button data-content="${textValue}"}>${textValue}</button>`;
  }

  cssTemplate(): string {
    return `
    <style>
    button,
button::after {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${this.attributes.getNamedItem("w")?.value};
  height: ${this.attributes.getNamedItem("h")?.value};
  font-size: ${this.attributes.getNamedItem("fs")?.value};
  font-family: serif, cursive;
  background: linear-gradient(45deg, transparent 5%, ${
    this.attributes.getNamedItem("bg")?.value
  } 5%);
  border: 0;
  color: ${this.attributes.getNamedItem("color")?.value};
  letter-spacing: 3px;
  line-height: 88px;
  box-shadow: 6px 0 0 ${this.attributes.getNamedItem("color")?.value};
  outline: transparent;
}
button::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  content: attr(data-content);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, ${
    this.attributes.getNamedItem("color")?.value
  } 3%, ${this.attributes.getNamedItem("color")?.value} 5%, ${
      this.attributes.getNamedItem("bg")?.value
    }5%);
  text-shadow: -3px -3px 0 ${
    this.attributes.getNamedItem("color")?.value
  }, 3px 3px 0 ${this.attributes.getNamedItem("color")?.value};
  clip-path: var(--slice-0);
}
    button:hover{
      cursor: pointer;
    }
    button:hover::after {
      animation: glitch 1s steps(2, end);
    }
    @keyframes glitch {
      0% {
        clip-path: var(--slice-1);
        transform: translate(-20px, -10px);
      }
      10% {
        clip-path: var(--slice-3);
        transform: translate(10px, 10px);
      }
      20% {
        clip-path: var(--slice-1);
        transform: translate(-10px, 10px);
      }
      30% {
        clip-path: var(--slice-3);
        transform: translate(0px, 5px);
      }
      40% {
        clip-path: var(--slice-2);
        transform: translate(-5px, 0px);
      }
      50% {
        clip-path: var(--slice-3);
        transform: translate(5px, 0px);
      }
      60% {
        clip-path: var(--slice-4);
        transform: translate(5px, 10px);
      }
      70% {
        clip-path: var(--slice-2);
        transform: translate(-10px, 10px);
      }
      80% {
        clip-path: var(--slice-5);
        transform: translate(20px, -10px);
      }
      90% {
        clip-path: var(--slice-1);
        transform: translate(-10px, 0px);
      }
      100% {
        clip-path: var(--slice-1);
        transform: translate(0);
      }
    }
    </style>
    `;
  }
}
