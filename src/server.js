const express = require("express");
const db = require('./db.js')

var bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
const port = 3000;

app.get("/leaderboard", (req, res) => {
  const sql = "select * from leaderboard order by score desc LIMIT 10";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json(rows)
  });
});

app.get("/leaderboard/multiplayer", (req, res) => {
  const sql = "select * from MultiplayerLeaderboard order by score desc LIMIT 10";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json(rows)
  });
});

app.post("/leaderboard/multiplayer", (req, res) => {
  const name = req.body["team"];
  const score = req.body["score"];
  const sql = `
    INSERT INTO MultiplayerLeaderboard (name, score) VALUES ("${team}", ${score})
  `;
  const params = [];
  db.run(sql, params, (err, rows) => {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.status(201);
  });
});

app.post("/leaderboard", (req, res) => {
  const name = req.body["username"];
  const score = req.body["score"];
  const sql = `
    INSERT INTO leaderboard (name, score) VALUES ("${name}", ${score})
  `;
  const params = [];
  db.run(sql, params, (err, rows) => {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.status(201);
  });
});

app.listen(3000, () => {
  console.log(`listening on ${port}`)
});
