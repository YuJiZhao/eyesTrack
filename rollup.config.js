import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import rollupTypescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const env = process.env.NODE_ENV
const name = "eyesTrack";
const config = {
    input: path.resolve(__dirname, "src/index.ts"),
    output: [
        {
            file: pkg.main,
            format: "cjs",
            globals: {
                axios: "axios"
            }
        },
        {
            file: pkg.module,
            format: "es",
            globals: {
                axios: "axios"
            }
        },
        {
            name,
            file: pkg.umd,
            format: "umd",
            globals: {
                axios: "axios"
            }
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        rollupTypescript(),
        json(),
        globals(),
        builtins(),
        babel({
            babelHelpers: "runtime",
            exclude: "node_modules/**",
            extensions: [
                ...DEFAULT_EXTENSIONS,
                ".ts",
            ],
        }),
    ],
    external: ["axios"],
}

if (env === "production") {
    config.plugins.push(terser({
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
        }
    }))
}

export default config
