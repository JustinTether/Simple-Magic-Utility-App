import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {
  @Input() public newDeck: any;
  @Input() public index: any;
  // Variables go here
  deckObject = {};
  cardLookup: any;
  data: any;
    readonly ROOT_URL ='http://165.227.207.165:3000/api'; // For Production
   // readonly ROOT_URL ='http://localhost:3000/api'; //Uncomment for dev work
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    console.log('This is the deck object', this.newDeck);
    console.log('This is the deck index', this.index);
  }

  searchCard(name) {
    this.http.get('https://api.scryfall.com/cards/named?fuzzy=' + name).subscribe(res => this.cardLookup = res);
    console.log(this.cardLookup);
  }

  addCardToDeck(card, amount) {
    if (!card) { return; }
    console.log('Adding new cards to deck');
    for(let i = 0; i < Number(amount); i++) {
      // Push card item
      console.log('Pushing Card');
      console.log('Deck object looks like', this.newDeck);
      this.newDeck.push(card);

    }
    this.toastr.success('Added cards to deck');
  }

  addDeck(name, index) {
    this.deckObject = {
      "name": name,
      "index": index,
      "kills": 0,
      "mulligans": 0,
      "cards": this.newDeck
    };
    console.log('This is our object we are sending to the server', this.deckObject);
    this.http.post(this.ROOT_URL + '/addDeck', this.deckObject).subscribe(res => this.data = res, err => this.data = err);
    switch(this.data.status) {
      case 400:
          this.toastr.error('Please check all fields and ensure you have added cards');
          break;

      case 201:
        this.toastr.success('Deck successfully added!');
        break;

      case 204:
        this.toastr.success('Deck successfully added!');
        break;

      default:
      this.toastr.warning('Odd response from server, double check if deck added successfully');
      break;
    }

  }

  removeCard(index) {
    this.newDeck.splice(index, 1);
  }
}
