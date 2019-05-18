import Scene from "scenejs";
import Media from "./Media";
import { MediaSceneInfo } from "./types";

export default class MediaScene extends Scene {
    private playInfos = {};
    constructor() {
        super();
    }
    /**
     * add video or audio mediaInfo
     * @param - unique id
     * @param - audio
     */
    public addMedia(id: string, url: string | HTMLMediaElement = id): Media {
        const media = new Media(url);

        this.setItem(id, media);
        return media;
    }
    public getInfo(): MediaSceneInfo {
        const info: MediaSceneInfo = {
            duration: 0,
            medias: [],
        };

        this.forEach((media: Media) => {
            info.medias.push(media.getInfo());
        });

        info.duration = this.getDuration();

        return info;
    }
}
