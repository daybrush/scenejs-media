import Media from "./Media";

export interface MediaInfo {
    url: string;
    playSpeed: number;
    delay: number;
    seek: number[];
    volume: number;
}
export interface MediaSceneInfo {
    duration: number;
    medias: MediaInfo[];
}
