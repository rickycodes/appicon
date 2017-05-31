require('require-yaml')
const test = require('tape')
const toUri = require('./to-uri')
const platforms = require('./platforms.yml')
const appicon = require('./')
const get = (app, platform) => require('./add-search')(
  app, platform, platforms
)

const isUri = (uri) => {
  return /^(data:)([\w/+]+);(charset=[\w-]+|base64).*,(.*)/.test(uri)
}

test('search urls should be correct', t => {
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

test('toUri should return valid data uri', t => {
  t.plan(1)
  t.equal(toUri('image/jpeg', ['A', 'B']), 'data:image/jpeg;base64,QUI=')
})

if (process.env.ONLINE) {
  test('appicon should work as promise', t => {
    t.plan(1)
    appicon('twitter', 'ios').then(uri => {
      t.pass('yay!')
      test('appicon uri should be valid data uri', t => {
        t.plan(1)
        t.equal(isUri(uri), true)
      })
    })
  })
}
