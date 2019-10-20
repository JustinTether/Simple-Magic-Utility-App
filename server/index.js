const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;


var players = [];

var data = fs.readFileSync(path.join(__dirname, "decks.json"));

data = JSON.parse(data);

console.log('Deck data has been loaded and parsed', data);

app.use(bodyParser.json({limit: "500kb"}));
app.use(cors());

app.use("/", express.static(path.join(__dirname, "..", "app")));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "..", "app/index.html"));
});

app.get('/api/getPlayers', (req, res) => {
  res.send(JSON.stringify(players))
  console.log('Someone asked me for players!');
})

app.post('/api/addPlayer', (req, res) => {
  console.log('We have recieved a request to add a player!');
       players.push({
      name: req.body.name,
      health: req.body.health,
      deck: req.body.deck,
      kills: req.body.kills,
      mulligans: req.body.mulligans

    });
    console.log('The request came in as ', req.body);
    console.log('Current Players object ', players)
    res.send({"status":201});
})

app.post('/api/removePlayer', (req, res) => {
  players.splice(req.body.index, 1);
  console.log('Current Players object ', players)
  res.send({"status":201});
})

app.post('/api/updatePlayer', (req, res) => {
  console.log('Recieved a request to update the player', req.body.name);
players[req.body.index] = {
  name: req.body.name,
  health: req.body.health,
  deck: req.body.deck,
  kills: req.body.kills,
  index: req.body.index,
  mulligans: req.body.mulligans

};

console.log('Current Players object ', players)
res.sendStatus(200);
})

app.get('/api/getDecks', (req, res) => {
  res.send(data.decks);
})

app.post('/api/addDeck', (req, res) => {
  console.log('We recieved a deck to add!', req.body);
  //Simple sanity checks, IE: If deck is empty, if deck has no cards
  if (!req.body.name) {res.sendStatus(400); return;}
  if (req.body.cards.length <= 0) {res.sendStatus(400); return; }

  if (req.body.index !== undefined) {
    console.log('Found an index, editing existing deck');
    data.decks[req.body.index] = req.body;
    fs.writeFileSync(path.join(__dirname, 'decks.json'), JSON.stringify(data, null, 2));
    console.log('Added a new deck!', req.body);
    res.status(201).send({msg: 'Addition of deck complete'});
    return;
  }



  data.decks.push(req.body);
  fs.writeFileSync(path.join(__dirname, 'decks.json'), JSON.stringify(data, null, 2));
  console.log('Added a new deck!', req.body);
  res.status(201).send({status: 201, msg: 'Addition of deck complete'});
})

app.post('/api/deleteDeck', (req, res) => {
    if (req.body.index !== undefined) {
      data.decks.splice(req.body.index, 1);
      res.status(200).send({"msg":'Item Successfully deleted'});
      fs.writeFileSync(path.join(__dirname, 'decks.json'), JSON.stringify(data, null, 2));
      return
    }else {
      res.status(400).send({"msg":'Something went wrong with your request'});
    }
})




app.listen(port, () => console.log(`Magic Utility Server listening on port ${port}!`))
//app.listen(80, () => console.log(`Magic Utility Server listening on port 80!`)) //Uncomment for production server



