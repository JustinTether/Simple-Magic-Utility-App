import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  decks = [
    'Storm Wizard',
    'Sac-Attack',
    'Re-Vamped',
    'Enter Profit',
    'Evoke Joy',
    'Combat Squad',
    'Search and Stomp',
    'Mono-Red',
    'Mutants',
    'Elves',
    'Golems',
    'Black Cancer',
    'Wiz Kidz',
    'Best Life',
    'Mill',
    'Walls'
  ];
  isCollapsed = true;
  players: any;
  player = {};
  input = [];
  card: any;
  dice = [];
   readonly ROOT_URL ='http://165.227.207.165:3000/api'; // For Production
  // readonly ROOT_URL ='http://localhost:3000/api'; //Uncomment for dev work
  constructor(private http: HttpClient) { }

  ngOnInit() {
    setInterval(() => {
      this.getPlayers();
  }, 250);
  }

  trackBy(item, index) {
    if(!item) { return null; }
    return item.index;
  }

getPlayers() {
  console.log('Am trying to hit end point');
  this.http.get(this.ROOT_URL + '/getPlayers').subscribe(res => this.players = res);
}




 addDeck(value) {
  this.decks.push(value);
}

removeDeck(index) {
  // Stuff to remove the deck that was provided in
  console.log('Data passed to function was ' + index);
  this.decks.splice(index, 1);
}

addPlayers(nPlayers) {
  console.log('Adding a player');
  this.player = {
   name: nPlayers,
    health: 20,
    deck: '',
    index: 0,
    kills: 0,
    mulligans: 0,
  };

  this.http.post(this.ROOT_URL + '/addPlayer', this.player).subscribe();

}

addKill(player, i) {
  console.log('Adding a kill to ', player);
  player.kills = player.kills + 1;
  player.index = i;
  this.http.post(this.ROOT_URL + '/updatePlayer', player).subscribe();
}

addMulligan(player, i) {
  console.log('Adding a Mulligan to ', player);
  player.mulligans = player.mulligans + 1;
  player.index = i;
  this.http.post(this.ROOT_URL + '/updatePlayer', player).subscribe();
}

randomDeck(player, i) {
  let selector = Math.floor(Math.random() * this.decks.length);
  player.deck = this.decks[selector];
  player.index = i;
  this.decks.splice(selector, 1);

  this.http.post(this.ROOT_URL + '/updatePlayer', player).subscribe();
}

removePlayer(index) {
 // this.players.splice(player, 1);
  let payload = {'index':index};
  this.http.post( this.ROOT_URL + '/removePlayer', payload).subscribe();
}

lowerHealth(player, value, index) {
  player.health = player.health - value;
  player["index"] = index;
  console.log('Player Object being sent ',  player);
  this.http.post(this.ROOT_URL + '/updatePlayer', player).subscribe();
}

raiseHealth(player, value, index) {
  player.health = player.health + Number(value);
  player["index"] = index;
  console.log('Player Object being sent ', player);
  this.http.post(this.ROOT_URL + '/updatePlayer', player).subscribe();
}

searchCard(name) {
  this.http.get('https://api.scryfall.com/cards/named?fuzzy=' + name).subscribe(res => this.card = res);
  console.log(this.card);
}

rollDice(index) {
  if (this.dice[index]) {
    console.log('Got an existing index!', index, 'This is the entire dice object', this.dice);
    this.dice[index] = Math.floor(Math.random() * 20) + 1;
    return;
  }

  this.dice.push(Math.floor(Math.random() * 20) + 1);
  console.log('Great roll!', this.dice[index]);
}




}
