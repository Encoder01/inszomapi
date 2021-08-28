const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')
const cookieStore = new FileCookieStore('./cookies.json')
const username = "squaking02";
const password = "40045052339";
const client = new Instagram({ username, password, cookieStore });

module.exports = { client };