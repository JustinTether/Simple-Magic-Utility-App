import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  decks: any;
  deckSelect: any;
   readonly ROOT_URL ='http://165.227.207.165:3000/api'; // For Production
  // readonly ROOT_URL ='http://localhost:3000/api'; //Uncomment for dev work

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.getDecks();

  }

 // Handle how this page creates data

consoleLog(input) {
  console.log(input);
  console.log(typeof input);
}

editDeck(index) {
  if (this.deckSelect === index){ this.deckSelect = 999; return; }
  this.deckSelect = index;
}

 getDecks() {
   this.http.get(this.ROOT_URL + '/getDecks').subscribe(res => this.decks = res);
   console.log(this.decks);
 }

 trackBy(item, index) {
  if(!item) { return null; }
  return item.index;
}


}
