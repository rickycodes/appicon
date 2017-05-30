require('require-yaml')
const Nightmare = require('nightmare')
const nightmare = new Nightmare({ show: false })
const http = require('http')
const format = require('./format')
const platforms = require('./platforms.yml')
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

  if (!app || !platform) {
    die('you must specify an app + platform')
  }

  if (!Object.keys(platforms).some(p => p === platform)) {
    die(`platform must be one of: ${Object.keys(platforms).join(', ')}`)
  }

  const _platform = require('./add-search')(app, platform, platforms)
  const link = `#res h3 a[href*="${_platform.site}"]`

  nightmare
    .goto(_platform.search)
    .wait(link)
    .click(link)
    .wait(_platform.selector)
    .evaluate((_platform) => {
      const qs = document.querySelector(_platform.selector)
      return qs[_platform.prop]
    }, _platform)
    .end()
    .then(loadImage)
}
