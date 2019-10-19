import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { DecksComponent } from './decks/decks.component';
import { AddDeckComponent } from './add-deck/add-deck.component';

const routes: Routes = [
  {path: 'app-game', component: GameComponent},
  {path: 'app-decks', component: DecksComponent},
  {path: 'app-add-deck', component: AddDeckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
