import {debounce} from '../../utils/utils';

export class Trainers {
  constructor() {
    this.trainerCards = document.querySelectorAll('.trainer');
  }

  init() {
    if (this.trainerCards.length) {
      window.addEventListener('resize', debounce(this, this.setTitleHeight, 100));
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
}
