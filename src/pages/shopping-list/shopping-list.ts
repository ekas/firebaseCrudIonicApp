import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController} from 'ionic-angular';

import { FirebaseListObservable , AngularFireDatabase} from 'angularfire2/database';

import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$ : FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {
    // we are pointing shopping list ref $ 
    this.shoppingListRef$ = this.database.list('shopping-item');
    //this.shoppingListRef$.subscribe(x => console.log(x));
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    //dispaly action sheet  for Edit, Delete and Cancel selection
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text:'Edit',
          handler : () =>{
            //send the user to EditShoppingItemPage and pass the key as a parameter
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler : () =>{
            //delete the item from list, passed in via the parameter
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text:'Cancel',
          role:'cancel',
          handler : () => {
            console.log("The user has selected the cancel Button");
          }
        }
      ]
    }).present();
  }

  navigateToAddShoppingPage(){
    //Navigate the user to add shopping page
    this.navCtrl.push(AddShoppingPage);
  }

}
