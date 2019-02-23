//run `node index.js`
//get request gives a sample, post request parses your file

const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());


app.get("/", (req, res) => {
  res.send("waddup");
})
app.get("/login", (req, res) => {
  axios.get(`https://accounts.spotify.com/authorize?
    client_id=f60b1417d554416baba6161f2e89a205&
    response_type=code&
    redirect_uri=https://cool-new-sounds-bot.herokuapp.com/`
  ).then(response => {
    console.log(response);
  });
});

app.post("/newsong", (req,res) => {
  console.log(req.body);
  if(req.body.sender_type === "bot") return;
  const scRegex = /.*spotify\.com.*/;
  if(req.body.text.match(scRegex)){
    const text = "yooooo";
    console.log("match found");
    axios.post("https://api.groupme.com/v3/bots/post",
    {
      bot_id: process.env.BOT_ID,
      text: JSON.stringify(req.body.text)
    }).then(function (response) {
      return res.send("all good" + JSON.stringify(req.body));
    })
    .catch(function (error) {
      return res.send("failure" + error);
    });
  } else return res.send("not needed");
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
