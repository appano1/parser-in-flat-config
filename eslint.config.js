import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tsVue from "@vue/eslint-config-typescript";
import * as tsParser from "typescript-eslint-parser-for-extra-files";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2017,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.vue"],
    plugins: { vue },
    processor: vue.processors[".vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ...tsVue.parserOptions,
        parser: tsParser,
      },
    },
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs["vue3-essential"].rules,
      ...vue.configs["vue3-strongly-recommended"].rules,
      ...vue.configs["vue3-recommended"].rules,
    },
  },
  {
    files: tsVue.overrides[0].files.map((file) => `**/${file}`),
    rules: {
      ...tsVue.overrides[0].rules,
    },
  },
);
