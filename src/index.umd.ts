import MediaScene, * as modules from "./index";

for (const name in modules) {
    (MediaScene as any)[name] = (modules as any)[name];
}

export default MediaScene;
