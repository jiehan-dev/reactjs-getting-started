module.exports = {
  parser: 'babel-eslint',
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 11,
    'sourceType': 'module'
  },
  'plugins': ['react'],
  'rules': {}
};
