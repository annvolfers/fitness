import {Slider} from './slider';

const initSliders = () => {
  const sliders = document.querySelectorAll('[data-slider="root"]');
  sliders.forEach((slider) => {
    const newSlider = new Slider(slider);
    newSlider.init();
  });
};

export {initSliders};
