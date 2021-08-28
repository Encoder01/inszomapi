const { client } = require('../instagram')
const crypto = require('crypto-js');

let reqParams = crypto.SHA256('squamobi-get-instagram-data');
reqParams = reqParams.toString(crypto.enc.Base64);
reqParams = reqParams.replace("+", "");
reqParams = reqParams.replace("=", "");


exports.getUser = async (req, res) => {
  console.log(reqParams)
  console.log(req.query.token)
  if (req.query.token == reqParams) {
    try {
      let responseData = await client.getUserByUsername({ username: req.params.userName })
      res.json(
        {
          bio: responseData.biography,
          follower: responseData.follower_count,
          following: responseData.following_count,
          fullName: responseData.full_name,
          userName: responseData.username,
          id: responseData.pk,
          mediaCount: responseData.media_count,
          private: responseData.is_private,
          versions: responseData.hd_profile_pic_versions,
          images:
          {
            low: responseData.profile_pic_url,
            sd: responseData.hd_profile_pic_versions ? responseData.hd_profile_pic_versions[0].url : responseData.profile_pic_url,
            hd: responseData.hd_profile_pic_url_info.url
          }
        }
      );
    } catch (err) {
      res.json({
        error: err.message,
        errorCode: err
      })
      res.status(403)
    }
  } else {
    res.send("INVALID AUTH")
  }

};
/*
{
  bio: responseData.biography,
    follower: responseData.follower_count,
      following: responseData.following_count,
        fullName: responseData.full_name,
          userName: responseData.username,
            id: responseData.pk,
              mediaCount: responseData.media_count,
                private: responseData.is_private,
                  versions: responseData.hd_profile_pic_versions,
                    images:
  {
    low: responseData.profile_pic_url,
      sd: responseData.hd_profile_pic_versions ? responseData.hd_profile_pic_versions[0].url : responseData.profile_pic_url,
        hd: responseData.hd_profile_pic_url_info.url
  }
}*/