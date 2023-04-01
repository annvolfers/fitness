export class Video {
  constructor() {
    this.container = document.querySelector('[data-container]');
    this.video = document.querySelector('[data-video]');
    this.playButton = document.querySelector('[data-play-button]');
    this.youtubePlayer = null;

    this.playButton.classList.add('disabled');
    this.playButton.tabIndex = -1;
  }

  init() {
    this.loadScript('https://www.youtube.com/player_api', this.initPlayer.bind(this));
  }

  playButtonClickHandler(evt) {
    if (this.youtubePlayer.playVideo) {
      evt.preventDefault();
      this.container.classList.add('is-active');
      this.youtubePlayer.playVideo();
    }
  }

  initPlayer() {
    window.onYouTubePlayerAPIReady = () => {
      this.youtubePlayer = new YT.Player(this.video.id, {
        videoId: this.video.id,
        events: {
          'onReady': this.enablePlayButton.bind(this),
          'onStateChange': this.putPlayButtonBack.bind(this),
        },
      });
    };
  }

  putPlayButtonBack(event) {
    if (event.data === 0) {
      this.container.classList.remove('is-active');
    }
  }

  enablePlayButton() {
    this.playButton.classList.remove('disabled');
    this.playButton.tabIndex = 0;

    this.playButton.addEventListener('click', this.playButtonClickHandler.bind(this));
  }

  loadScript(src, handleLoad) {
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    document.body.append(scriptElement);

    scriptElement.addEventListener('load', handleLoad);
  }
}
