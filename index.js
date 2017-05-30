require('require-yaml')
const http = require('http')
const format = require('./format')
const platforms = require('./platforms.yml')
const getIconUrl = require('./get-icon-url')
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

  getIconUrl(_platform).then(loadImage)
}
