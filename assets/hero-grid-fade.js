// assets/hero-grid-fade.js
// Skifter grid-layout og billeder med fade hver 5. sekund

class HeroGridFade {
  constructor(sectionId, config) {
    this.section = document.getElementById(sectionId);
    this.mediaWrapper = this.section?.querySelector(".hero__media-wrapper");
    this.config = config;
    this.timer = null;
    this.fadeDuration = 800;
    this.currentDevice = this.getDeviceType();
    this.waves = this.getWavesForDevice();
    this.waveIndex = 0;
    this.preloadHeroImages();
    this.init();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width <= 749) return "mobile";
    if (width <= 1023) return "tablet";
    return "desktop";
  }

  getWavesForDevice() {
    const device = this.getDeviceType();
    if (device === "mobile" && this.config.mobile && this.config.mobile.length && this.config.mobile[0].images.filter((i) => i && i.src).length) {
      return this.config.mobile;
    } else if (device === "tablet" && this.config.tablet && this.config.tablet.length && this.config.tablet[0].images.filter((i) => i && i.src).length) {
      return this.config.tablet;
    } else if (this.config.waves && this.config.waves.length && this.config.waves[0].images.filter((i) => i && i.src).length) {
      return this.config.waves;
    } else if (this.config.mobile && this.config.mobile.length) {
      return this.config.mobile;
    } else if (this.config.tablet && this.config.tablet.length) {
      return this.config.tablet;
    } else {
      return [];
    }
  }

  preloadHeroImages() {
    // Preload alle billeder fra alle waves for den aktuelle device-type
    const allImages = [];
    if (this.waves) {
      this.waves.forEach((wave) => {
        (wave.images || []).forEach((img) => {
          if (img && img.src) allImages.push(img.src);
        });
      });
    }
    allImages.forEach((src) => {
      if (!document.querySelector(`link[rel='preload'][href='${src}']`)) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      }
    });
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
    const firstWave = this.waves[0];
    this.active.style.gridTemplateColumns = firstWave.columns;
    this.active.innerHTML = (firstWave.images || [])
      .filter((img) => img && img.src)
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
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.waveIndex = (this.waveIndex + 1) % this.waves.length;
      this.showWave(this.waveIndex);
    }, 5000);
  }

  showWave(index, instant) {
    const wave = this.waves[index];
    this.inactive.style.gridTemplateColumns = wave.columns;
    this.inactive.innerHTML = (wave.images || [])
      .filter((img) => img && img.src)
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

  handleResize() {
    // Tjek om device-type har ændret sig (fx desktop -> mobil)
    const newDevice = this.getDeviceType();
    if (newDevice !== this.currentDevice) {
      this.currentDevice = newDevice;
      this.waves = this.getWavesForDevice();
      this.waveIndex = 0;
      this.preloadHeroImages();
      // Fjern eksisterende wrappers og lav nye for at sikre korrekt reset
      this.mediaWrapper.innerHTML = "";
      this.init();
      if (this.timer) clearInterval(this.timer);
    } else {
      // Opdater gridTemplateColumns på begge wrappers
      const wave = this.waves[this.waveIndex];
      const columns = wave.columns;
      if (this.active) this.active.style.gridTemplateColumns = columns;
      if (this.inactive) this.inactive.style.gridTemplateColumns = columns;
    }
  }
}

window.HeroGridFade = HeroGridFade;
