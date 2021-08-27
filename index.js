const express = require('express');
const port = process.env.PORT || 3005;
const { client } = require('./instagram')

const searchUserRouter = require('./Routes/searchUser.routes')
const getUserRouter = require('./Routes/getUser.routes')

const app = express();


; (async () => {
  try {
    await client.login()
  } catch (err) {
   //
  }
})()



app.use('/api/userList/', searchUserRouter)
app.use('/api/getUser/', getUserRouter)

app.listen(port, () => {
  console.log(`A NodeJS API is listining on port: ${port}`);
});


module.exports = app;