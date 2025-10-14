import globals from "globals";
import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";

export default [{
    ignores: [
        "distribution/dependencies/*.css",
        "distribution/dependencies/*.js",
        "**/lib/",
        "**/jest.config.js",
        "**/test-env.js",
    ],
}, {
    languageOptions: {
        globals: {
            ...globals.jest,
            ...globals.browser,
            ...globals.webextensions,
            ...globals.jquery,
            ...globals.node,
        },

        parser: babelParser,
        ecmaVersion: 2020,
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                presets: ["@babel/preset-env"]
            },
            ecmaFeatures: {
                modules: true,
            },
        },
    },

    rules: {
        ...js.configs.recommended.rules,
        "linebreak-style": ["error", "unix"],
        "no-console": "off",
        "constructor-super": "error",
        "no-class-assign": "error",
        "no-const-assign": "error",
        "no-dupe-class-members": "error",
        "no-new-symbol": "error",
        "no-this-before-super": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "warn",
        "prefer-const": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
    },
}];