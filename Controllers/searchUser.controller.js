const { client } = require('../instagram')
const crypto = require('crypto-js');

let reqParams = crypto.SHA256('squamobi-get-instagram-data');
reqParams = reqParams.toString(crypto.enc.Base64);
reqParams = reqParams.replace("+", "");
reqParams = reqParams.replace("=", "");

exports.searchUser = async (req, res) => {
  if (req.query.token == reqParams) {
    try {
      let responseData = await client.search({ query: req.params.userName })
      res.json(
        cleanUsersList(responseData)
      );
    } catch (err) {
      res.json({
        error: err.message,
        errorCode: "403"
      })
      res.status(403)
    }
  } else {
    res.send('INVALID TOKEN')
  }
};

cleanUsersList = (data) => {
  return data.users.map(function (insta) {
    return {
      username: insta.user.username,
      fullName: insta.user.full_name,
      isPrivate: insta.user.is_private,
      profilePic: insta.user.profile_pic_url,
    }
  })
}
