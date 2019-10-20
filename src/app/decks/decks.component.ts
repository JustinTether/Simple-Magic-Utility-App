import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService, ToastRef } from 'ngx-toastr';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  decks: any;
  deckSelect: any;
  data: any;
   readonly ROOT_URL ='http://165.227.207.165:3000/api'; // For Production
  // readonly ROOT_URL ='http://localhost:3000/api'; //Uncomment for dev work

  constructor(private http: HttpClient, private toastr: ToastrService) { }

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

deleteDeck(i) {
  let postObject = {
    index: i
  };

  let post = new Promise((resolve, reject) => {
    if (confirm('Are you sure you want to delete this deck?')) {
      this.http.post(this.ROOT_URL + '/deleteDeck', postObject, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      console.log('Request to delete accepted, here is response', this.data);
      resolve(this.data);
      },
       err => {
         this.data = err;
         console.log('Request to server had been denied..', this.data);
         reject(this.data);
        });
      }
   });

  post.then((message) => {
    console.log('Deletion of deck is a success!', message);
    this.toastr.success('Deletion of deck was successful!');
    this.getDecks();
  }).catch((message) => {
    console.error('Deletion of deck was unsuccessful', message);
    this.toastr.error('Something went wrong deleting the deck. Check logs');
});

}


}
