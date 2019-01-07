module.exports = {
  plugins: {
    'cssnano': {
      preset: ['default', {
        discardComments: false,
        normalizeWhitespace: false
      }]
    },
    'postcss-combine-duplicated-selectors': {
      removeDuplicatedProperties: true
    },
    'css-declaration-sorter': {
      order: 'smacss'
    },
    'autoprefixer': {}
  }
}