# media-scene [![npm version](https://badge.fury.io/js/media-scene.svg)](https://badge.fury.io/js/media-scene)

A library for playing or controlling media
## dependencies
* **[scenejs](github.com/daybrush/scenejs)** >= 1.0.0-rc4

## Installation
### npm
```sh
$ npm i media-scene
```

### script
```html
<script src="//daybrush.com/scenejs/release/latest/dist/scene.js"></script>
<script src="//daybrush.com/media-scene/release/latest/dist/mediascene.js"></script>
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