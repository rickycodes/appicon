const chunks = []
const http = require('http')
const format = require('./format')
const data = (data) => chunks.push(data)

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const res = (res) => {
      const contentType = res.headers['content-type']
      res.setEncoding('binary')
      res.on('data', data)
      res.on('end', () => resolve(format(contentType, chunks)))
    }

    http
      .get(url.replace(/^https:/, 'http:'))
      .on('response', res)
  })
}
