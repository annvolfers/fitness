export class Slider {
  constructor(element) {
    this.root = element;
    this.slider = this.root.querySelector('[data-slider="slider"]');
    this.slidesCount = this.slider.querySelectorAll('[data-slider="slide"]').length;
    this.buttonNext = this.root.querySelector('[data-slider="button-next"]');
    this.buttonPrev = this.root.querySelector('[data-slider="button-prev"]');

    this.Layouts = {
      mobile: {
        minWidth: 320,
        slidesPerViewForMultiple: 1,
      },
      tablet: {
        minWidth: 768,
        slidesPerViewForMultiple: Math.min(this.slidesCount, 2),
      },
      desktop: {
        minWidth: 1200,
        slidesPerViewForMultiple: Math.min(this.slidesCount, 4),
      },
    };

    this.setSliderOptions();
  }

  init() {
    this.swiper = new Swiper(`.${this.slider.classList[0]}`, this.options);
  }

  setSliderOptions() {
    this.options = {
      speed: 300,
      slidesPerView: 1,
      loop: this.slidesCount > 1,
      allowTouchMove: false,
      slideClass: 'slider__item',
      wrapperClass: 'slider__list',
      navigation: {
        nextEl: this.buttonNext,
        prevEl: this.buttonPrev,
      },
      on: {
        beforeResize: this.debounce(this.setLayoutType),
      },
    };

    if (this.slider.hasAttribute('data-multiple')) {
      this.options.breakpoints = {
        [this.Layouts.mobile.minWidth]: {
          slidesPerView: this.Layouts.mobile.slidesPerViewForMultiple,
          loop: this.slidesCount > this.Layouts.mobile.slidesPerViewForMultiple,
          spaceBetween: 32,
          allowTouchMove: true,
        },
        [this.Layouts.tablet.minWidth]: {
          slidesPerView: this.Layouts.tablet.slidesPerViewForMultiple,
          loop: this.slidesCount > this.Layouts.tablet.slidesPerViewForMultiple,
          spaceBetween: 30,
        },
        [this.Layouts.desktop.minWidth]: {
          slidesPerView: this.Layouts.desktop.slidesPerViewForMultiple,
          loop: this.slidesCount > this.Layouts.desktop.slidesPerViewForMultiple,
          spaceBetween: 40,
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
    if (this.prevLayoutType !== this.nextLayoutType) {

      if (this.nextLayoutType === this.Layouts.mobile) {
        this.swiper.slideTo(Math.min(this.slidesCount, 3));
      } else {
        this.swiper.slideTo(Math.min(this.slidesCount, 4));
      }

      this.updateButtonAvailability(this.nextLayoutType);
      this.prevLayoutType = this.nextLayoutType;
    }
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

  updateButtonAvailability(layoutType) {
    if (this.slidesCount > layoutType.slidesPerViewForMultiple) {
      this.buttonNext.disabled = false;
      this.buttonPrev.disabled = false;
    } else {
      this.buttonNext.disabled = true;
      this.buttonPrev.disabled = true;
    }
  }

  debounce(callback, timeoutDelay = 300) {
    let timeoutId;

    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
  }
}
