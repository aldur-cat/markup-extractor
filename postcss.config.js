module.exports = {
  plugins: {
    'cssnano': {
      preset: ['default', {
        discardComments: false,
        normalizeWhitespace: false
      }]
    },
    'css-declaration-sorter': {
      order: 'smacss'
    },
    'autoprefixer': {}
  }
}