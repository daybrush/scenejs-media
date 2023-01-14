/*
Copyright (c) Daybrush
name: @scenejs/media
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-media.git
version: 0.2.2
*/
import Scene from 'scenejs';
import { isString } from '@daybrush/utils';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Media = /*#__PURE__*/ (function (_super) {
    __extends(Media, _super);
    function Media(url) {
        var _this = _super.call(this) || this;
        _this.isPlayMedia = false;
        _this.init(url);
        return _this;
    }
    Media.prototype.getMediaItem = function () {
        return this.mediaItem;
    };
    Media.prototype.getVolume = function () {
        return this.mediaItem.get(0, "volume");
    };
    Media.prototype.setVolume = function (volume) {
        this.mediaItem.set(0, "volume", volume);
        return this;
    };
    Media.prototype.setPlaySpeed = function (playSpeed) {
        this.mediaItem.setPlaySpeed(playSpeed);
        return this;
    };
    Media.prototype.seek = function (fromTime, toTime) {
        var mediaItem = this.mediaItem;
        mediaItem.set(0, "seek", fromTime);
        mediaItem.set("100%", "seek", toTime);
        mediaItem.setDuration(toTime - fromTime);
        return this;
    };
    Media.prototype.setElement = function (element) {
        this.mediaItem.setElement(element);
        return this;
    };
    Media.prototype.getMediaElement = function () {
        return this.mediaItem.getElements()[0];
    };
    Media.prototype.getInfo = function () {
        var mediaItem = this.mediaItem;
        var seek = [mediaItem.get(0, "seek"), mediaItem.get("100%", "seek")];
        var playSpeed = mediaItem.getPlaySpeed();
        var volume = this.getVolume();
        var delay = this.getDelay();
        var info = {
            url: this.url,
            seek: seek,
            playSpeed: playSpeed,
            delay: delay,
            volume: volume,
        };
        return info;
    };
    Media.prototype.init = function (url) {
        var _this = this;
        var mediaItem = this.newItem("media");
        mediaItem.newFrame(0);
        mediaItem.newFrame(1);
        mediaItem.set(0, "volume", 1);
        mediaItem.set(0, "seek", 0);
        mediaItem.set("100%", "seek", 0);
        this.mediaItem = mediaItem;
        if (isString(url)) {
            var audio = new Audio();
            audio.src = url;
            this.setElement(audio);
            this.url = url;
        }
        else {
            if (url.src) {
                this.url = url.src;
            }
            else {
                var sourceElement = url.querySelector("[src]");
                this.url = sourceElement ? sourceElement.src : "";
            }
            this.setElement(url);
        }
        var prevTime = 0;
        this.on("paused", function (e) {
            var _a;
            _this.isPlayMedia = false;
            (_a = _this.getMediaElement()) === null || _a === void 0 ? void 0 : _a.pause();
        });
        this.on("animate", function (e) {
            var mediaElement = _this.getMediaElement();
            var time = e.time;
            var isReversTime = prevTime > time;
            var isRunning = _this.getPlayState() === "running";
            var isReverse = _this.getDirection().indexOf("reverse") > -1;
            var isPlayMedia = _this.isPlayMedia;
            var frame = e.frames.media;
            var playSpeed = mediaItem.getPlaySpeed();
            var duration = _this.getDuration();
            var volume = _this.getVolume();
            var seek = frame.get("seek");
            prevTime = time;
            if (!isRunning || !isPlayMedia) {
                mediaElement.playbackRate = playSpeed * (isReverse ? -1 : 1);
                mediaElement.currentTime = seek;
            }
            if (isReversTime || time <= 0 || duration <= time) {
                // end play
                if (isRunning) {
                    _this.isPlayMedia = false;
                    mediaElement.pause();
                }
            }
            else {
                mediaElement.volume = volume;
                if (!isPlayMedia && isRunning) {
                    _this.isPlayMedia = true;
                    var result = mediaElement.play();
                    if (result instanceof Promise) {
                        result.catch(function () {
                            mediaElement.muted = true;
                            mediaElement.play();
                        });
                    }
                }
            }
        });
    };
    return Media;
}(Scene));

var MediaScene = /*#__PURE__*/ (function (_super) {
    __extends(MediaScene, _super);
    function MediaScene() {
        var _this = _super.call(this) || this;
        _this.playInfos = {};
        return _this;
    }
    /**
     * add video or audio mediaInfo
     * @param - unique id
     * @param - audio
     */
    MediaScene.prototype.addMedia = function (id, url) {
        if (url === void 0) { url = id; }
        var media = new Media(url);
        this.setItem(id, media);
        return media;
    };
    MediaScene.prototype.getInfo = function () {
        var info = {
            duration: 0,
            medias: [],
        };
        this.forEach(function (media) {
            info.medias.push(media.getInfo());
        });
        info.duration = this.getDuration();
        return info;
    };
    return MediaScene;
}(Scene));

export { Media, MediaScene as default };
//# sourceMappingURL=media.esm.js.map
