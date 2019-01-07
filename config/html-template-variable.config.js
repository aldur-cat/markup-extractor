module.exports = (htmlWebpackPlugin) => {
  const arrChunkNames = htmlWebpackPlugin.options.chunks;
  const isDevEnv = process.env.NODE_ENV !== 'production';
  let injectTags = ``;

  if (!htmlWebpackPlugin.options.inject) {
    for (const i in arrChunkNames) {
      if (isDevEnv) { 
        injectTags += `<script src="./js-dev/${arrChunkNames[i]}.js"></script>\n`;
      } else {
        injectTags += `<link rel="stylesheet" href="./css/${arrChunkNames[i]}.css">\n`;
      }
    }
  }

  return {
    injectTags
  }
}