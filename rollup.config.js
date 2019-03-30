import builder from "@daybrush/builder";

export default builder([
  {
    name: "MediaScene",
    input: "src/MediaScene.ts",
    output: "./dist/mediascene.js",
  },
  {
    name: "MediaScene",
    input: "src/MediaScene.ts",
    output: "./dist/mediascene.min.js",
    uglify: true,
  },
  {
    name: "MediaScene",
    input: "src/MediaScene.ts",
    output: "./dist/mediascene.esm.js",
    format: "es",
  },

]);
