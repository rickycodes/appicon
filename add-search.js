const baseUrl = 'https://www.google.com/#q='
module.exports = (obj, app, platform) => Object.assign(
  { search: `${baseUrl}site:${obj.url}+${app}+${platform}+app` },
  obj
)
