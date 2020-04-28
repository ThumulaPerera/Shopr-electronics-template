module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": "off",
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "no-shadow": "off",
    "react/state-in-constructor": [1, "never"],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
  },
};
