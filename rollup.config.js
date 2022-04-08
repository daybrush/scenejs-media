import builder from "@daybrush/builder";

const defaultOptions = {
    name: "MediaScene",
    input: "src/index.umd.ts",
    output: "./dist/media.js",
    exports: "default",
}
export default builder([
  {
    ...defaultOptions,
    resolve: true,
    external: {
        "scenejs": "Scene",
    }
  },
  {
    ...defaultOptions,
    output: "./dist/media.min.js",
    resolve: true,
    uglify: true,
    external: {
        "scenejs": "Scene",
    },
  },
  {
    ...defaultOptions,
    input: "src/index.ts",
    output: "./dist/media.esm.js",
    format: "es",
    exports: "named",
  },
  {
    ...defaultOptions,
    output: "./dist/media.cjs.js",
    format: "cjs",
  },
]);
