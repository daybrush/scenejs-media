const builder = require("@daybrush/builder");

const defaultOptions = {
    name: "MediaScene",
    input: "src/index.umd.ts",
    output: "./dist/media.js",
    exports: "default",
}
module.exports = builder([
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
        input: "src/index.cjs.ts",
        output: "./dist/media.cjs.js",
        format: "cjs",
        exports: "named",
    },
]);
