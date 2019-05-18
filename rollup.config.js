import builder from "@daybrush/builder";

export default builder([
  {
    name: "MediaScene",
    input: "src/MediaScene.ts",
    output: "./dist/media.js",
    resolve: true,
    external: {
        "scenejs": "Scene",
    }
  },
  {
    name: "MediaScene",
    input: "src/MediaScene.ts",
    output: "./dist/media.min.js",
    resolve: true,
    external: {
        "scenejs": "Scene",
    },
    uglify: true,
  },
  {
    name: "MediaScene",
    input: "src/MediaScene.ts",
    output: "./dist/media.esm.js",
    format: "es",
  },

]);
