module.exports = (contentType, chunks) => {
  const prefix = `data:${contentType};base64,`
  const str = Buffer.from(chunks.join(''), 'binary').toString('base64')
  return `${prefix}${str}`
}
