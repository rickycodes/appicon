const baseUrl = 'https://www.google.com/#q='
module.exports = (app, platform) => ({
  ios: {
    url: `${baseUrl}${app}+${platform}`,
    storeUrl: 'itunes.apple.com',
    imgSelector: 'meta[itemprop]',
    prop: 'content'
  },
  android: {
    url: `${baseUrl}${app}+${platform}+app`,
    storeUrl: 'play.google.com',
    imgSelector: '.cover-image',
    prop: 'src'
  }
})
