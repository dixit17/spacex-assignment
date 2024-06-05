module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { esmodules: true } }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    env: {
      test: {
        presets: [
          ['@babel/preset-env', { modules: 'commonjs' }],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
            "@babel/plugin-transform-modules-commonjs",
            '@babel/plugin-transform-runtime',
          ],
      },
    },
  };
  