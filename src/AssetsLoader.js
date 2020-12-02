export default class AssetsLoader {
  constructor(_AssetsFiles) {
    this._AssetsFiles = _AssetsFiles;
    this._Assets = {};
  }

  loadAll() {
    const promises = [];
    for (const name in this._AssetsFiles) {
      if (!Object.prototype.hasOwnProperty.call(this._AssetsFiles, name)) continue;
      if (this._AssetsFiles[name].includes(`mp3`, `mpeg`, `wav`)) {
        promises.push(this.loadAudio(name, this._AssetsFiles[name]));
      } else {
        promises.push(
          this.loadImage(name, this._AssetsFiles[name]),
        );
      }
    }
    return Promise.all(promises);
  }

  loadImage(name, src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      this._Assets[name] = image;
      image.onload = () => resolve(name);
      image.onerror = () => reject(new Error(`failed to load ${name}`));
      image.src = src;
    });
  }

  loadAudio(name, src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      this._Assets[name] = audio;
      audio.muted = false;
      audio.oncanplaythrough = () => resolve(name);
      audio.onerror = () => reject(new Error(`failed to load ${name}`));
      audio.src = src;
    });
  }
  /**
   * Causes the loading of objects..
   * @param {function} callback Calls callback
   * @param {Object} ObjectAssets assigns all loaded assets
   * @param {Number} errTimeout wait show err in ms
   * @param {Number} AnimationTimeout in ms
   * @param {undefined} Animation (``) plug if you need AnimationTimeout
   * Animation and AnimationTimeout are not available yet but you can use this as a delay.
   */

  async Load(
    callback,
    ObjectAssets,
    errTimeout = 1500,
    AnimationTimeout = 1000,
    Animation = undefined,
  ) {
    try {
      await this.loadAll();
      // eslint-disable-next-line no-param-reassign
      Object.assign(ObjectAssets, this._Assets);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(`Error loading resources! ${err}. Reloading site...`);
      setTimeout(() => window.reload, errTimeout);
    }
    if (Animation !== undefined) {
      // run anim
      await new Promise((resolve) => setTimeout(resolve, AnimationTimeout));
      // stop animation
    }
    callback();
  }
}
