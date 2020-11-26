export class AssetsLoader {
    constructor(_AssetsFiles) {
        this._AssetsFiles = _AssetsFiles;
        this._Assets = {};
    }

    loadAll() {
        const promises = [];
        for (let name in this._AssetsFiles) {
            if (!this._AssetsFiles.hasOwnProperty(name)) continue;
            if (this._AssetsFiles[name].src.includes(`mp3`, `mpeg`, `wav`) === true) {
                promises.push(this.loadAudio(name, this._AssetsFiles[name].src))
            } else {
                promises.push(this.loadImage(name, this._AssetsFiles[name].src,
                                             this._AssetsFiles[name].width || undefined,
                                             this._AssetsFiles[name].height || undefined));
                console.log(name, this._AssetsFiles[name])
            }
        }
        return Promise.all(promises);
    }

    loadImage(name, src, width, height) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            this._Assets[name] = image;
            image.onload = () => resolve(name);
            image.onerror = () => reject(`failed to load ${name}`);
            image.src = src;
            if (width != undefined) image.width = width;
            if (height != undefined) image.height = height;
        });
    }

    loadAudio(name, src) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            this._Assets[name] = audio;
            audio.muted = false;
            audio.oncanplaythrough = () => resolve(name);
            audio.onerror = () => reject(`failed to load ${name}`);
            audio.src = src;
        });
    }
    /**
     * Causes the loading of objects..
     * @param load Calls callback and also assigns all loaded assets to the array you need.
     * errtimeout and AnimationTimeout are recorded in ms.
     * Animation and AnimationTimeout are not available yet but you can use this as a delay.
     * For example loader.Load (callback, Object, errTimeout, 1500, '');
     */
    
    async Load(callback, ObjectAssets, errTimeout = 1500, AnimationTimeout = 1000, Animation = undefined) {
        try {
            await this.loadAll()
            ObjectAssets = Object.assign(ObjectAssets, this._Assets);
        } catch (err) {
            alert(`Error loading resources! ${err}. Reloading site...`);
            setTimeout(() => location.reload, errTimeout);
        }
        if (Animation != undefined) {``
            //run anim
            await new Promise(resolve => setTimeout(resolve, AnimationTimeout));
            //stop animation
        }
        callback();
    }
}