import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable , AngularFireDatabase} from 'angularfire2/database';

import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface'

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$ : FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    // we are pointing shopping list ref $ 
    this.shoppingListRef$ = this.database.list('shopping-item');
    //this.shoppingListRef$.subscribe(x => console.log(x));
  }

  navigateToAddShoppingPage(){
    //Navigate the user to add shopping page
    this.navCtrl.push(AddShoppingPage);
  }

}
