import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "distribution/dependencies/*.css",
        "distribution/dependencies/*.js",
        "**/lib/",
        "**/jest.config.js",
        "**/test-env.js",
    ],
}, ...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.jest,
            ...globals.browser,
            ...globals.webextensions,
            ...globals.jquery,
            ...globals.node,
        },

        parser: babelParser,
        ecmaVersion: 7,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                modules: true,
            },
        },
    },

    rules: {
        "linebreak-style": ["error", "unix"],
        "no-console": "off",
    },
}];