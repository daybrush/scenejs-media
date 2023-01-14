import MediaScene, * as modules from "./index";

for (const name in modules) {
    (MediaScene as any)[name] = (modules as any)[name];
}

export * from "./index";
export default MediaScene;

declare const module: any;
module.exports = MediaScene;
