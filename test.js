require('require-yaml')
const test = require('tape')
const format = require('./format')
const platforms = require('./platforms.yml')
const get = (app, platform) => require('./add-search')(
  platforms[platform], app, platform
)

test('urls should be correct', t => {
  t.plan(2)
  t.equal(
    get('twitter', 'ios').search,
    'https://www.google.com/#q=site:itunes.apple.com+twitter+ios+app'
  )
  t.equal(
    get('mario', 'android').search,
    'https://www.google.com/#q=site:play.google.com+mario+android+app'
  )
})

test('format should return valid data uri', t => {
  t.plan(1)
  t.equal(format('image/jpeg', ['A', 'B']), 'data:image/jpeg;base64,QUI=')
})
