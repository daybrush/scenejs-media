import Scene, { SceneItem } from "scenejs";
import { isString } from "@daybrush/utils";
import { MediaInfo } from "./types";

export default class Media extends Scene {
    public url: string;
    private isPlayMedia: boolean = false;
    private mediaItem: SceneItem;
    constructor(url: string | HTMLMediaElement) {
        super();
        this.init(url);
    }
    public getMediaItem(): SceneItem {
        return this.mediaItem;
    }
    public getVolume(): number {
        return this.mediaItem.get(0, "volume");
    }
    public setVolume(volume: number): this {
        this.mediaItem.set(0, "volume", volume);

        return this;
    }
    public setPlaySpeed(playSpeed: number): this {
        this.mediaItem.setPlaySpeed(playSpeed);
        return this;
    }
    public seek(fromTime: number, toTime: number): this {
        const mediaItem = this.mediaItem;

        mediaItem.set(0, "seek", fromTime);
        mediaItem.set("100%", "seek", toTime);
        mediaItem.setDuration(toTime - fromTime);

        return this;
    }
    public setElement(element: HTMLMediaElement): this {
        this.mediaItem.setElement(element);
        return this;
    }
    public getInfo(): MediaInfo {
        const mediaItem = this.mediaItem;
        const seek = [mediaItem.get(0, "seek"), mediaItem.get("100%", "seek")];
        const playSpeed = mediaItem.getPlaySpeed();
        const volume = this.getVolume();
        const delay = this.getDelay();
        const info: MediaInfo = {
            url: this.url,
            seek,
            playSpeed,
            delay,
            volume,
        };

        return info;
    }
    private init(url: string | HTMLMediaElement) {
        const mediaItem = this.newItem("media");
        mediaItem.newFrame(0);
        mediaItem.newFrame(1);

        this.mediaItem = mediaItem;

        if (isString(url)) {
            const audio = new Audio();
            audio.src = url;
            this.setElement(audio);
            this.url = url;
        } else {
            if (url.src) {
                this.url = url.src;
            } else {
                const sourceElement = url.querySelector<HTMLSourceElement>("[src]");

                this.url = sourceElement ? sourceElement.src : "";
            }
            this.setElement(url);
        }
        this.on("animate", e => {
            const mediaElement = mediaItem.getElements()[0] as HTMLMediaElement;

            const isPlaying = this.getPlayState() === "running";
            const isReverse = this.getDirection().indexOf("reverse") > -1;
            const isPlayMedia = this.isPlayMedia;
            const frame = e.frames.media;
            const time = e.time;

            const playSpeed = mediaItem.getPlaySpeed();
            const duration = this.getDuration();
            const volume = this.getVolume();
            const seek = frame.get("seek");

            if (time <= 0 || duration <= time) {
                // end play
                if (isPlaying) {
                    this.isPlayMedia = false;
                    mediaElement.pause();
                }
            } else {
                mediaElement.volume = volume;

                if (!isPlaying || !isPlayMedia) {
                    mediaElement.playbackRate = playSpeed * (isReverse ? -1 : 1);
                    mediaElement.currentTime = seek;
                }
                if (!isPlayMedia && isPlaying) {
                    this.isPlayMedia = true;
                    mediaElement.play();
                }
            }
        });
    }
}
