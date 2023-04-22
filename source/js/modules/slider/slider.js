import {debounce} from '../../utils/utils';

export class Slider {
  constructor(element) {
    this.root = element;
    this.slider = this.root.querySelector('[data-slider="slider"]');
    this.isSliderMultiple = this.slider.hasAttribute('data-multiple');
    this.isLockFocus = this.slider.hasAttribute('data-lock-focus');
    this.slides = this.slider.querySelectorAll('[data-slider="slide"]');
    this.slidesCount = this.slides.length;
    this.buttonNext = this.root.querySelector('[data-slider="button-next"]');
    this.buttonPrev = this.root.querySelector('[data-slider="button-prev"]');

    this.Layouts = {
      mobile: {
        minWidth: 320,
        slidesPerView: 1,
      },
      tablet: {
        minWidth: 768,
        slidesPerView: Math.min(this.slidesCount, 2),
      },
      desktop: {
        minWidth: 1200,
        slidesPerView: Math.min(this.slidesCount, 4),
      },
    };

    this.setSliderOptions();
  }

  init() {
    this.swiper = new Swiper(`.${this.slider.classList[0]}`, this.options);
    this.setLayoutType();
  }

  setSliderOptions() {
    this.options = {
      speed: 300,
      slidesPerView: 1,
      loop: this.isSliderMultiple,
      spaceBetween: 40,
      autoHeight: true,
      slideClass: 'slider__item',
      wrapperClass: 'slider__list',
      navigation: {
        nextEl: this.buttonNext,
        prevEl: this.buttonPrev,
      },
      on: {
        beforeResize: debounce(this, this.setLayoutType),
        slideChangeTransitionEnd: (swiper) => this.setSlideTabIndex(swiper),
      },
      breakpoints: {
        [this.Layouts.mobile.minWidth]: {
          allowTouchMove: true,
        },
        [this.Layouts.tablet.minWidth]: {
          allowTouchMove: false,
        },
        [this.Layouts.desktop.minWidth]: {
          allowTouchMove: false,
        },
      },
    };

    if (this.isSliderMultiple) {
      this.options.breakpoints = {
        [this.Layouts.mobile.minWidth]: {
          slidesPerView: this.Layouts.mobile.slidesPerView,
          spaceBetween: 32,
          allowTouchMove: true,
        },
        [this.Layouts.tablet.minWidth]: {
          slidesPerView: this.Layouts.tablet.slidesPerView,
          spaceBetween: 30,
          allowTouchMove: false,
        },
        [this.Layouts.desktop.minWidth]: {
          slidesPerView: this.Layouts.desktop.slidesPerView,
          spaceBetween: 40,
          allowTouchMove: false,
        },
      };

      if (this.slidesCount === 1) {
        this.slider.style.setProperty('--maxWidthDesktop', 'min(calc(100% - 400px), 500px)');
        this.slider.style.setProperty('--maxWidthTablet', 'min(calc(100% - 400px), 500px)');
      }
    }
  }

  setLayoutType() {
    this.nextLayoutType = this.getLayoutType();

    if (this.prevLayoutType === this.nextLayoutType) {
      return;
    }

    if (this.isSliderMultiple) {

      if (this.nextLayoutType === this.Layouts.mobile) {
        this.swiper.slideTo(Math.min(this.slidesCount, 3));
      } else {
        this.swiper.slideTo(Math.min(this.slidesCount, 4));
      }

      this.updateButtonVisibility(this.nextLayoutType);
    } else {
      this.updateButtonVisibility();
    }

    this.setSlideTabIndex();
    this.prevLayoutType = this.nextLayoutType;
  }

  getLayoutType() {
    if (window.innerWidth >= this.Layouts.mobile.minWidth && window.innerWidth < this.Layouts.tablet.minWidth) {
      return this.Layouts.mobile;
    } else if (window.innerWidth < this.Layouts.desktop.minWidth) {
      return this.Layouts.tablet;
    } else {
      return this.Layouts.desktop;
    }
  }

  updateButtonVisibility(layoutType = this.options) {
    if (this.slidesCount > layoutType.slidesPerView) {
      this.buttonNext.classList.remove('hidden');
      this.buttonPrev.classList.remove('hidden');
      this.buttonNext.tabIndex = 0;
      this.buttonPrev.tabIndex = 0;
    } else {
      this.buttonNext.classList.add('hidden');
      this.buttonPrev.classList.add('hidden');
      this.buttonNext.tabIndex = -1;
      this.buttonPrev.tabIndex = -1;
    }
  }

  setSlideTabIndex(swiper = this.swiper) {
    if (!this.isLockFocus) {
      return;
    }

    const sliderLeftCoordinate = this.slider.getBoundingClientRect().left;
    const sliderRightCoordinate = this.slider.getBoundingClientRect().right;

    swiper.slides.forEach((slide) => {
      const slideLeftCoordinate = slide.getBoundingClientRect().left;
      const slideRightCoordinate = slide.getBoundingClientRect().right;

      if (slideLeftCoordinate > sliderLeftCoordinate && slideRightCoordinate < sliderRightCoordinate) {
        slide.tabIndex = 0;
      } else {
        slide.tabIndex = -1;
      }
    });
  }
}
