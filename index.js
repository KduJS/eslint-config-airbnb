const importResolver = {
  // https://github.com/benmosher/eslint-plugin-import/issues/1396
  [require.resolve('eslint-import-resolver-node')]: {},
};

try {
  const kduCliConfig = require.resolve('@kdujs/cli-service/webpack.config.js');
  importResolver[require.resolve('eslint-import-resolver-webpack')] = {
    config: kduCliConfig,
  };
} catch (e) {
  // ignore
}

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:kdujs-accessibility/recommended',
  ],
  settings: {
    'import/resolver': importResolver,
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs', // ?
      '.ts',
      '.tsx',
    ],
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],

    'kdujs-accessibility/no-onchange': 'off',

    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for kdux state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
  },
};
