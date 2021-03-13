class VideoTransition {
  
  constructor() {
    this.iframe = document.createElement('iframe');
    this.button = document.querySelector('.start');
    this.overlay = document.querySelector('.overlay');
    this.videos = ['517180316', '517190044', '517190175'];
    this.index = 0;
    this.listing = {};

    this.iframe.setAttribute('webkitallowfullscreen', 'webkitallowfullscreen');
    this.iframe.setAttribute('mozallowfullscreen', 'mozallowfullscreen');
    this.iframe.setAttribute('allowfullscreen', 'allowfullscreen');
    this.iframe.setAttribute('frameborder', '0');
    this.iframe.setAttribute('allow', 'autoplay');
    this.iframe.setAttribute('cross-origin', 'anonymous');
    this.iframe.src = `https://player.vimeo.com/video/${this.videos[0]}`
    document.body.appendChild(this.iframe);

    this.player = new Vimeo.Player(this.iframe);

    this.init();
  }

  init() {
    this.button.addEventListener('click', async () => {
      this.playVideo();
      this.listeners();
    });
  }

  playVideo() {
    this.overlay.style.visibility = 'hidden';
    this.overlay.style.pointerEvents = 'none';
    this.iframe.style.pointerEvents = 'all';
    this.player.play();
  }

  listeners() {
    this.player.on('ended', () => {

      if (this.index === 0) {
        const button1 = document.createElement('button');
        button1.setAttribute('data-target', '1');
        button1.innerText = 'Chemin n°1';

        this.overlay.innerHTML = '';
        this.overlay.appendChild(button1);

        this.overlay.style.visibility = 'visible';
        this.overlay.style.pointerEvents = 'all';
        
        button1.addEventListener('click', () => {
          this.index = 1;
          this.player.loadVideo(this.videos[1]).then(() => {
            this.overlay.style.visibility = 'hidden';
            this.overlay.style.pointerEvents = 'none';
            this.player.play();
          });
        });
      }
      
      if(this.index === 1) {
        this.index = 2;
        this.player.loadVideo(this.videos[2]).then(() => {
          this.player.play();
        });
      }
    });
  }

  async nextStep() {
    this.player.loadVideo(this.videos[1]).then(() => {
      this.overlay.style.visibility = 'hidden';
      this.overlay.style.pointerEvents = 'none';
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