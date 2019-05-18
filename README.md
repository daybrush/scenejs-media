# @scenejs/media [![npm version](https://badge.fury.io/js/@scenejs/media.svg)](https://badge.fury.io/js/@scenejs/media)

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
* scene with a total length of 8 seconds and the audio will play in 7 seconds. 
* The audio ends at 7.5 because the playSpeed is 2x.
```html
<audio style="display: none">
    <source src="clapper.wav" type="audio/wav" />
</audio>
<script>
const clapperElement = document.querySelector("audio");
const mediaScene = new MediaScene(
    8,
    {
        "./clapper.wav": {
            7: {
                seek: [0, 1],
                playSpeed: 2,
                volume: 0.7,
            },
            options: {
                element: clapperElement,
            }
        },
    }
).play();
</script>
```