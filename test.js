const test = require('tape')
const platforms = require('./platforms')
const format = require('./format')
const getSub = (app, platform) => platforms(app, platform)[platform]

test('urls should be correct', t => {
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

test('format should return valid data uri', t => {
  t.plan(1)
  t.equal(format('image/jpeg', ['A', 'B']), 'data:image/jpeg;base64,QUI=')
})
