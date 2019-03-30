import Scene, { SceneItem } from "scenejs";

export default class MediaScene extends Scene {
    playInfos = {};
    constructor(duration, properties, options) {
        super();
        this.setDuration(duration);
        this.load(properties, options);
        this.init();
    }
    getInfo() {
        const mediaInfo = {};
        this.forEach((item: SceneItem, path) => {
            const info = {};
            const times = item.times;

            times.forEach(time => {
                const frame = item.getFrame(time);
                const seek = frame.get("seek");
                const playSpeed = frame.get("playSpeed") || 1;
                const volume = frame.get("volume") || 1;

                info[time] = {
                    seek,
                    playSpeed,
                    volume,
                }
            });
            mediaInfo[path] = info;
        });

        return mediaInfo;
    }
    init() {
        const playInfos = this.playInfos;

        this.on("animate", e => {
            const audioTime = e.time;
            const isPlaying = this.getPlayState() === "running";

            this.forEach((item: SceneItem, id) => {
                !playInfos[id] &&  (playInfos[item.getId()] = {});

                const itemInfo = playInfos[id];

                item.times.forEach(time => {
                    const element = item.elements[0] as HTMLMediaElement;

                    if (!element) {
                        return;
                    }
                    !itemInfo[time] && (itemInfo[time] = {isPlay: false});
                    const playInfo = itemInfo[time];
                    const frame = item.getFrame(time);
                    const [startTime, endTime] = frame.get("seek");
                    const playSpeed = frame.get("playSpeed") || 1;
                    const duration = endTime - startTime;

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
                    const distance = (audioTime - time) * playSpeed;
                    const volume = frame.get("volume") || 1;

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
    }
}
