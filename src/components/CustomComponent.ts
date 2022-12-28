import { ISchema } from "../interfaces/ISchema";

export abstract class CustomComponent extends HTMLElement implements ISchema {
  protected shadowDOM: ShadowRoot;

  constructor(init: ShadowRootInit) {
    super();
    this.shadowDOM = this.attachShadow(init);
  }

  abstract setComponentAttributes(): void;

  abstract render(): void;

  abstract initComponent(): void;

  abstract htmlTemplate(): string;

  abstract cssTemplate(): string;
}
