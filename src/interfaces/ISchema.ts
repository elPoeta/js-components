export interface ISchema {
  setComponentAttributes: () => void;
  render: () => void;
  initComponent: () => void;
  htmlTemplate: () => string;
  cssTemplate: () => string;
}
