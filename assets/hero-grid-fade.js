// assets/hero-grid-fade.js
// Skifter grid-layout og billeder med fade hver 7. sekund

class HeroGridFade {
  constructor(sectionId, config) {
    this.section = document.getElementById(sectionId);
    this.mediaWrapper = this.section?.querySelector(".hero__media-wrapper");
    this.waveIndex = 0;
    this.config = config;
    this.timer = null;
    this.fadeDuration = 800;
    this.init();
  }

  init() {
    if (!this.mediaWrapper) return;
    // Opret to overlays til crossfade
    this.wrapperA = document.createElement("div");
    this.wrapperB = document.createElement("div");
    Object.assign(this.wrapperA.style, this._baseStyle());
    Object.assign(this.wrapperB.style, this._baseStyle());
    this.mediaWrapper.appendChild(this.wrapperA);
    this.mediaWrapper.appendChild(this.wrapperB);
    this.active = this.wrapperA;
    this.inactive = this.wrapperB;
    // Vis første grid-bølge straks uden fade
    const firstWave = this.config.waves[0];
    this.active.style.gridTemplateColumns = firstWave.columns;
    this.active.innerHTML = firstWave.images
      .filter((img) => img.src)
      .map((img) => `<img src="${img.src}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center;" />`)
      .join("");
    this.active.style.opacity = 1;
    this.inactive.style.opacity = 0;
    // Start fade til næste bølge efter interval
    setTimeout(() => {
      this.startTimer();
      this.showWave(1, false);
      this.waveIndex = 1;
    }, 5000);
  }

  _baseStyle() {
    return {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      display: "grid",
      transition: `opacity ${this.fadeDuration}ms`,
      opacity: 0,
      pointerEvents: "none",
    };
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.waveIndex = (this.waveIndex + 1) % this.config.waves.length;
      this.showWave(this.waveIndex);
    }, 5000);
  }

  showWave(index, instant) {
    const wave = this.config.waves[index];
    // Opdater grid og billeder på inaktiv wrapper
    this.inactive.style.gridTemplateColumns = wave.columns;
    this.inactive.innerHTML = wave.images
      .filter((img) => img.src)
      .map((img) => `<img src="${img.src}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:center;" />`)
      .join("");
    // Bring inaktiv wrapper frem med fade
    this.inactive.style.opacity = 1;
    this.active.style.opacity = 0;
    // Swap references efter fade
    setTimeout(
      () => {
        // Byt roller
        const temp = this.active;
        this.active = this.inactive;
        this.inactive = temp;
      },
      instant ? 0 : this.fadeDuration,
    );
    // Hvis første load, vis straks
    if (instant) {
      this.active.style.opacity = 1;
      this.inactive.style.opacity = 0;
    }
  }
}

window.HeroGridFade = HeroGridFade;
