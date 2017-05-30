const Nightmare = require('nightmare')
const nightmare = new Nightmare({ show: false })

module.exports = (platform) => {
  const link = `#res h3 a[href*="${platform.site}"]`
  return new Promise((resolve, reject) => {
    nightmare
      .goto(platform.search)
      .wait(link)
      .click(link)
      .wait(platform.selector)
      .evaluate((platform) => {
        const qs = document.querySelector(platform.selector)
        return qs[platform.prop]
      }, platform)
      .end()
      .then(resolve)
  })
}
