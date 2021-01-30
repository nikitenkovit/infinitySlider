import {setOnClickBlur} from "./utils/blur.js";
import {Slider} from "./moduls/slider.js";

setOnClickBlur();

const sliderRoots = document.querySelectorAll(`.slider`);

sliderRoots.forEach((root) => {
  const slider = new Slider(root);
  slider.init();
});
