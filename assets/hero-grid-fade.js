// assets/hero-grid-fade.js
// Skifter grid-layout og billeder med fade hver 7. sekund

class HeroGridFade {
  constructor(sectionId, config) {
    this.section = document.getElementById(sectionId);
    this.mediaWrapper = this.section?.querySelector(".hero__media-wrapper");
    this.waveIndex = 0;
    this.config = config;
    this.timer = null;
    this.init();
  }

  init() {
    if (!this.mediaWrapper) return;
    this.showWave(0);
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.waveIndex = (this.waveIndex + 1) % this.config.waves.length;
      this.showWave(this.waveIndex);
    }, 7000);
  }

  showWave(index) {
    const wave = this.config.waves[index];
    // Fade out
    this.mediaWrapper.style.transition = "opacity 0.8s";
    this.mediaWrapper.style.opacity = 0;
    setTimeout(() => {
      // Skift grid-template-columns
      this.mediaWrapper.style.gridTemplateColumns = wave.columns;
      // Skift billeder
      this.mediaWrapper.innerHTML = wave.images.map((img) => `<img src="${img.src}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center;transition:opacity 0.8s;opacity:1;" />`).join("");
      // Fade in
      this.mediaWrapper.style.opacity = 1;
    }, 800);
  }
}

window.HeroGridFade = HeroGridFade;
