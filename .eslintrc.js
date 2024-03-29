module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    // react は v17からimport react が不要になったのでこのルールも不要.
    "react/react-in-jsx-scope": "off",
    // process系の型エラーは無視したい
    "@typescript-eslint/ban-ts-comment": "off",
    "import/order": [2, { alphabetize: { order: "asc" } }],
  },
};
