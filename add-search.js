const baseUrl = 'https://www.google.com/#q='
module.exports = (app, platform, platforms) => Object.assign(
  { search: `${baseUrl}site:${platforms[platform].site}+${app}+${platform}+app` },
  platforms[platform]
)
