export class Trainers {
  constructor() {
    this.trainerCards = document.querySelectorAll('.trainer');
  }

  init() {
    this.trainerCards.forEach((trainerCard) => {
      const content = trainerCard.querySelector('.trainer__content-wrapper');
      const title = trainerCard.querySelector('h3');
      const titleHeight = title.offsetHeight;
      content.style.setProperty('--titleHeight', `${titleHeight}px`);
    });
  }
}
