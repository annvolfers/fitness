export class Trainers {
  constructor() {
    this.trainerCards = document.querySelectorAll('.trainer');
  }

  init() {
    if (this.trainerCards.length) {
      window.addEventListener('resize', this.debounce(this.setTitleHeight));
    }

    this.setTitleHeight();
  }

  setTitleHeight() {
    this.trainerCards.forEach((trainerCard) => {
      const content = trainerCard.querySelector('.trainer__content-wrapper');
      const title = trainerCard.querySelector('h3');
      const titleHeight = title.offsetHeight;
      content.style.setProperty('--titleHeight', `${titleHeight}px`);
    });
  }

  debounce(callback, timeoutDelay = 100) {
    let timeoutId;

    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
  }
}
