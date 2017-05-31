require('require-yaml')
const platforms = require('./platforms.yml')
const getUrl = require('./get-url')
const loadImage = require('./load-image')
const die = (reason) => console.log(reason) & process.exit(1)

module.exports = (app, platform, callback) => {
  if (!app || !platform) {
    die('you must specify an app + platform')
  }

  if (!Object.keys(platforms).some(p => p === platform)) {
    die(`platform must be one of: ${Object.keys(platforms).join(', ')}`)
  }

  const _platform = require('./add-search')(app, platform, platforms)

  return new Promise((resolve, reject) => {
    getUrl(_platform).then((url) => {
      loadImage(url).then(callback || resolve)
    })
  })
}
