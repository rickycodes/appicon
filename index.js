const Nightmare = require('nightmare')
const nightmare = new Nightmare({ show: false })
const http = require('http')
const format = require('./format')
const die = (reason) => console.log(reason) & process.exit(1)

module.exports = (app, platform, cb) => {
  const chunks = []

  const data = (data) => chunks.push(data)

  const res = (res) => {
    const contentType = res.headers['content-type']
    res.setEncoding('binary')
    res.on('data', data)
    res.on('end', () => cb(format(contentType, chunks)))
  }

  const loadImage = (url) => http
    .get(url.replace(/^https:/, 'http:'))
    .on('response', res)

  const platforms = require('./platforms')(app, platform)

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
      const { imgSelector } = platforms[platform]
      const qs = document.querySelector(imgSelector)
      return qs[platforms[platform].prop]
    }, platform, platforms)
    .end()
    .then(loadImage)
}
