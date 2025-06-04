import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
// import darraghorNestjsTyped from "@darraghor/eslint-plugin-nestjs-typed";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
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

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    // "plugin:@darraghor/nestjs-typed/recommended",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslintEslintPlugin),
        // "@darraghor/nestjs-typed": fixupPluginRules(darraghorNestjsTyped),
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: "./",
        },
    },

    settings: {
        "import/resolver": {
            typescript: true,
            node: true,
        },
    },

    rules: {
        // "@typescript-eslint/no-unsafe-return": "warn",
        // "@typescript-eslint/no-unsafe-assignment": "warn",
        // "@typescript-eslint/no-unsafe-member-access": "warn",

        "import/prefer-default-export": "off",
        "import/extensions": "off",
        "no-useless-constructor": "off",
        "class-methods-use-this": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-cycle": "off",
        "no-await-in-loop": "off",
        "no-underscore-dangle": "off",
        curly: "error",
        "object-shorthand": ["error", "always"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": ["error"],
        "no-return-await": "off",
        "@typescript-eslint/return-await": "error",
        "@typescript-eslint/require-await": "error",
        "import/no-named-as-default": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "error",

        "import/order": ["error", {
            groups: [["builtin"], ["external"], ["internal"], ["parent", "sibling", "index"]],

            pathGroups: [{
                pattern: "@nestjs/**",
                group: "external",
                position: "after",
            }, {
                pattern: "@core/**",
                group: "internal",
                position: "before",
            }, {
                pattern: "@common/**",
                group: "internal",
                position: "before",
            }],

            pathGroupsExcludedImportTypes: ["builtin"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
}];