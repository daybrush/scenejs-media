/*
Copyright (c) 2019 Daybrush
name: @scenejs/media
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/@scenejs/media.git
version: 0.1.0
*/
import Scene from 'scenejs';
import { isString } from '@daybrush/utils';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Media =
/*#__PURE__*/
function (_super) {
  __extends(Media, _super);

  function Media(url) {
    var _this = _super.call(this) || this;

    _this.isPlayMedia = false;

    _this.init(url);

    return _this;
  }

  var __proto = Media.prototype;

  __proto.getMediaItem = function () {
    return this.mediaItem;
  };

  __proto.getVolume = function () {
    return this.mediaItem.get(0, "volume");
  };

  __proto.setVolume = function (volume) {
    this.mediaItem.set(0, "volume", volume);
    return this;
  };

  __proto.setPlaySpeed = function (playSpeed) {
    this.mediaItem.setPlaySpeed(playSpeed);
    return this;
  };

  __proto.seek = function (fromTime, toTime) {
    var mediaItem = this.mediaItem;
    mediaItem.set(0, "seek", fromTime);
    mediaItem.set("100%", "seek", toTime);
    mediaItem.setDuration(toTime - fromTime);
    return this;
  };

  __proto.setElement = function (element) {
    this.mediaItem.setElement(element);
    return this;
  };

  __proto.getInfo = function () {
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
      volume: volume
    };
    return info;
  };

  __proto.init = function (url) {
    var _this = this;

    var mediaItem = this.newItem("media");
    mediaItem.newFrame(0);
    mediaItem.newFrame(1);
    this.mediaItem = mediaItem;

    if (isString(url)) {
      var audio = new Audio();
      audio.src = url;
      this.setElement(audio);
      this.url = url;
    } else {
      if (url.src) {
        this.url = url.src;
      } else {
        var sourceElement = url.querySelector("[src]");
        this.url = sourceElement ? sourceElement.src : "";
      }

      this.setElement(url);
    }

    var prevTime = 0;
    this.on("pause", function (e) {
      var mediaElement = mediaItem.getElements()[0];
      _this.isPlayMedia = false;
      mediaElement.pause();
    });
    this.on("animate", function (e) {
      var mediaElement = mediaItem.getElements()[0];
      var time = e.time;
      var isReversTime = prevTime > time;
      var isPlaying = _this.getPlayState() === "running";
      var isReverse = _this.getDirection().indexOf("reverse") > -1;
      var isPlayMedia = _this.isPlayMedia;
      var frame = e.frames.media;
      var playSpeed = mediaItem.getPlaySpeed();

      var duration = _this.getDuration();

      var volume = _this.getVolume();

      var seek = frame.get("seek");
      prevTime = time;

      if (isReversTime || time <= 0 || duration <= time) {
        // end play
        if (isPlaying) {
          _this.isPlayMedia = false;
          mediaElement.pause();
        }
      } else {
        mediaElement.volume = volume;

        if (!isPlaying || !isPlayMedia) {
          mediaElement.playbackRate = playSpeed * (isReverse ? -1 : 1);
          mediaElement.currentTime = seek;
        }

        if (!isPlayMedia && isPlaying) {
          _this.isPlayMedia = true;
          mediaElement.play();
        }
      }
    });
  };

  return Media;
}(Scene);

var MediaScene =
/*#__PURE__*/
function (_super) {
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


  var __proto = MediaScene.prototype;

  __proto.addMedia = function (id, url) {
    if (url === void 0) {
      url = id;
    }

    var media = new Media(url);
    this.setItem(id, media);
    return media;
  };

  __proto.getInfo = function () {
    var info = {
      duration: 0,
      medias: []
    };
    this.forEach(function (media) {
      info.medias.push(media.getInfo());
    });
    info.duration = this.getDuration();
    return info;
  };

  return MediaScene;
}(Scene);

export default MediaScene;
