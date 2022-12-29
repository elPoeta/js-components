import { ISchema } from "../interfaces/ISchema";

export abstract class CustomComponent extends HTMLElement implements ISchema {
  protected shadowDOM: ShadowRoot;

  constructor(init: ShadowRootInit) {
    super();
    this.shadowDOM = this.attachShadow(init);
  }

  connectedCallback() {
    this.setComponentAttributes();
    this.render();
    this.initComponent();
  }

  disconnectedCallback() {
    this.remove();
  }

  render() {
    this.shadowDOM.innerHTML = `
      ${this.cssTemplate()}
      ${this.htmlTemplate()}
    `;
  }

  abstract setComponentAttributes(): void;

  abstract initComponent(): void;

  abstract htmlTemplate(): string;

  abstract cssTemplate(): string;
}
