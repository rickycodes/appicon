const test = require('tape')
const platforms = require('./platforms')
const getSub = (app, platform) => platforms(app, platform)[platform]

test('urls should be correct', (t) => {
  t.plan(2)
  t.equal(
    getSub('twitter', 'ios').url,
    'https://www.google.com/#q=twitter+ios+app'
  )
  t.equal(
    getSub('mario', 'android').url,
    'https://www.google.com/#q=mario+android+app'
  )
})
