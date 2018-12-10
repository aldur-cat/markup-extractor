module.exports = {
  plugins: {
    'cssnano': {
      preset: ['default', {
        discardComments: false,
        minifyFontValues: false,
        normalizeWhitespace: false
      }]
    },
    'css-declaration-sorter': {
      order: 'smacss'
    },
    'autoprefixer': {}
  }
}