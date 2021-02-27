class VideoTransition {
  
  constructor() {
    this.player = document.createElement('video');
    this.button = document.querySelector('.start');
    this.overlay = document.querySelector('.overlay');
    this.videos = ['video1', 'video2', 'video3'];
    this.index = 0;
    this.listing = {};

    this.init();
  }

  init() {
    this.button.addEventListener('click', async () => {
      this.playVideo();
      this.listeners();
    });
  }

  playVideo() {
    this.player.setAttribute('controls', 'controls');
    document.body.appendChild(this.player);
    
    this.fetchVideo(`video${this.index + 1}`).then(() => {
      this.overlay.style.visibility = 'hidden';
      this.overlay.style.pointerEvents = 'none';
      this.player.style.pointerEvents = 'all';
      this.player.play();
    });
  }

  listeners() {
    this.player.addEventListener('ended', () => {
      if (this.index === 0) {
        const button1 = document.createElement('button');
        button1.setAttribute('data-target', '1');
        button1.innerText = 'Chemin n°1';

        const button2 = document.createElement('button');
        button2.setAttribute('data-target', '2');
        button2.innerText = 'Chemin n°2';

        this.overlay.innerHTML = '';
        this.overlay.appendChild(button1);
        this.overlay.appendChild(button2);

        this.overlay.style.visibility = 'visible';
        this.overlay.style.pointerEvents = 'all';
        this.player.style.pointerEvents = 'none';

        button1.addEventListener('click', async () => {
          this.index = 1;
          await this.nextStep();
        });
        button2.addEventListener('click', async () => {
          this.index = 2;
          await this.nextStep();
        });
      }
    });
  }

  async nextStep() {
    this.fetchVideo(this.videos[this.index]).then(() => {
      this.overlay.style.visibility = 'hidden';
      this.overlay.style.pointerEvents = 'none';
      this.player.style.pointerEvents = 'all';
      this.player.play();
    });
  }

  async fetchVideo(video) {
    const request = await fetch(`/videos/${video}.mp4`, {mode: 'no-cors'})
    const blob = await request.blob();
    const source = URL.createObjectURL(blob);
    this.player.src = source;
  }
}

new VideoTransition();