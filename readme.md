# JSAssetsLoader
It is a library for loading files asynchronously.
# What she does?

Using this library, you can asynchronously load all kinds of assets, as well as add animation and callback calls.
# Example 
``` 
const loader = new AssetsLoader({
    bg1: 'assets/bg1.png',
    fonMus: `assets/fon.mp3`,
}); 
loader.Load(callback, Object, errTimeout, AnimationTimeout, Animation );
ctx.drawImage(Object[`bg1`], 0, 0); 
```

# What else needs to be done?
- [ ] Add animations
- [ ] Add even more supported types
`Currently only HTMLAudioElement and HTMLImageElement are supported`
- [ ] Optimize perfomance
# Warning
**At the moment it doesn't make sense to add the last 2 arguments to the load method, namely AnimationTimeout and Animation**
If you want to cause a delay before the callback, then AnimationTimeout enter the time you need in ms, and in Animation enter any plug, for example, ``
