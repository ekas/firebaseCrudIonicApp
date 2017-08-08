import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Subscription } from 'rxjs/Subscription';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    //capture the shoppingItemId as a NavParameter

    const shoppingItemId  = this.navParams.get('shoppingItemId');
    console.log(shoppingItemId);

    //set the scope of our Firebase Object equal to our NavParams
    this.shoppingItemRef$ = this.database.object(`shopping-item/${shoppingItemId}`);
    
    //subscribe  to the object and assign the result to the this.shoppingItem
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem)
  }

  //Updates our firebase node with new item data
  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.update(shoppingItem);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    //Unscribe from the Observable when leaving he page
    this.shoppingItemSubscription.unsubscribe();
  }
}
