const baseUrl = 'https://www.google.com/#q='
module.exports = (app, platform) => {
  const platforms = {
    ios: {
      storeUrl: 'itunes.apple.com',
      imgSelector: 'meta[itemprop]',
      prop: 'content'
    },
    android: {
      storeUrl: 'play.google.com',
      imgSelector: '.cover-image',
      prop: 'src'
    }
  }

  Object.keys(platforms).forEach((platform) => {
    const sub = platforms[platform]
    sub.url = `${baseUrl}site:${sub.storeUrl}+${app}+${platform}+app`
  })

  return platforms
}
