import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase , FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  //creating new object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRefs$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: AngularFireDatabase) {
    this.shoppingItemRefs$ = this.database.list('shopping-item');
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    console.log(shoppingItem);
  }

}
