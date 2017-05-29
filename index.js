const Nightmare = require('nightmare')
const nightmare = new Nightmare({ show: false })
const http = require('http')
const baseUrl = 'https://www.google.com/#q='
const die = (reason) => console.log(reason) & process.exit(1)

module.exports = (app, platform, cb) => {
  const chunks = []

  const data = (data) => chunks.push(data)

  const end = (contentType, chunks) => {
    const prefix = `data:${contentType};base64,`
    const str = Buffer.from(chunks.join(''), 'binary').toString('base64')
    const uri = `${prefix}${str}`
    cb(uri)
  }

  const res = (res) => {
    const contentType = res.headers['content-type']
    res.setEncoding('binary')
    res.on('data', data)
    res.on('end', () => end(contentType, chunks))
  }

  const loadImage = (url) => http
    .get(url.replace(/^https:/, 'http:'))
    .on('response', res)

  const platforms = {
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
  }

  if (!app || !platform) {
    die('you must specify an app + platform')
  }

  if (!Object.keys(platforms).some(p => p === platform)) {
    die(`platform must be one of: ${Object.keys(platforms).join(', ')}`)
  }

  const link = `#res h3 a[href*="${platforms[platform].storeUrl}"]`

  nightmare
    .goto(platforms[platform].url)
    .wait(link)
    .click(link)
    .wait(platforms[platform].imgSelector)
    .evaluate((platform, platforms) => {
      const imgSelector = platforms[platform].imgSelector
      const qs = document.querySelector(imgSelector)
      return qs[platforms[platform].prop]
    }, platform, platforms)
    .end()
    .then(loadImage)
}
