const args = process.argv
const appicon = require('./')
appicon(args[2], args[3], (uri) => console.log(uri))
