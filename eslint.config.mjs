import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
        "no-unused-vars": "off",
        "no-undef": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-require-imports": "off"
    }
  },
  {
    languageOptions: {
        globals: {
            ...globals.jest,
            ...globals.node,
        }
    }
  }
];