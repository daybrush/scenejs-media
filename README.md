# @scenejs/media [![npm version](https://badge.fury.io/js/%40scenejs%2Fmedia.svg)](https://badge.fury.io/js/%40scenejs%2Fmedia)

A library for playing or controlling media with **[scenejs](github.com/daybrush/scenejs)**

## Installation
### npm
```sh
$ npm i @scenejs/media
```

### script
```html
<script src="//daybrush.com/scenejs/release/latest/dist/scene.js"></script>
<script src="//daybrush.com/scenejs-media/release/latest/dist/media.js"></script>
```


## How to use
```js
const mediaScene = new MediaScene();

mediaScene
    .addMedia("./clapper.mp3")
    .seek(0, 0.452)
    .setVolume(0.5)
    .setPlaySpeed(2)
    .setDelay(1);

```