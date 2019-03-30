/*
Copyright (c) 2019 Daybrush
name: media-scene
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/media-scene.git
version: 0.0.1
*/
import Scene from 'scenejs';

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

var MediaScene =
/*#__PURE__*/
function (_super) {
  __extends(MediaScene, _super);

  function MediaScene(duration, properties, options) {
    var _this = _super.call(this) || this;

    _this.playInfos = {};

    _this.setDuration(duration);

    _this.load(properties, options);

    _this.init();

    return _this;
  }

  var __proto = MediaScene.prototype;

  __proto.getInfo = function () {
    var mediaInfo = {};
    this.forEach(function (item, path) {
      var info = {};
      var times = item.times;
      times.forEach(function (time) {
        var frame = item.getFrame(time);
        var seek = frame.get("seek");
        var playSpeed = frame.get("playSpeed") || 1;
        var volume = frame.get("volume") || 1;
        info[time] = {
          seek: seek,
          playSpeed: playSpeed,
          volume: volume
        };
      });
      mediaInfo[path] = info;
    });
    return mediaInfo;
  };

  __proto.init = function () {
    var _this = this;

    var playInfos = this.playInfos;
    this.on("animate", function (e) {
      var audioTime = e.time;
      var isPlaying = _this.getPlayState() === "running";

      _this.forEach(function (item, id) {
        !playInfos[id] && (playInfos[item.getId()] = {});
        var itemInfo = playInfos[id];
        item.times.forEach(function (time) {
          var element = item.elements[0];

          if (!element) {
            return;
          }

          !itemInfo[time] && (itemInfo[time] = {
            isPlay: false
          });
          var playInfo = itemInfo[time];
          var frame = item.getFrame(time);

          var _a = frame.get("seek"),
              startTime = _a[0],
              endTime = _a[1];

          var playSpeed = frame.get("playSpeed") || 1;
          var duration = endTime - startTime;

          if (audioTime > time + duration / playSpeed) {
            // play end
            if (isPlaying) {
              playInfo.isPlay = false;
              element.pause();
            }

            return;
          } else if (audioTime < time) {
            // not play
            playInfo.isPlay = false;
            return;
          } else if (playInfo.isPlay) {
            return;
          }

          var distance = (audioTime - time) * playSpeed;
          var volume = frame.get("volume") || 1;
          element.currentTime = startTime + (0.01 > distance ? 0 : distance);
          element.playbackRate = playSpeed;
          element.volume = volume;

          if (isPlaying) {
            playInfo.isPlay = true;
            element.play();
          }
        });
      });
    });
  };

  return MediaScene;
}(Scene);

export default MediaScene;
