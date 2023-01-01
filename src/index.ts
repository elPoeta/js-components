import { Chart } from "./components/chart/Chart.js";
import { GlitchButton } from "./components/glitchButton/GlitchButton.js";
import { ZoomImage } from "./components/zoomImage/ZoomImage.js";

window.customElements.define("poeta-glitch-button", GlitchButton);
window.customElements.define("poeta-zoom-image", ZoomImage);
window.customElements.define("poeta-chart", Chart);
