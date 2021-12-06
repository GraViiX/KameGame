import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICart } from '../Interface/icart';
import { IPurchase } from '../Interface/ipurchase';
import { CartService } from '../Services/cart.service';
import { AuthService } from '../Services/auth.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private api: CartService, private _auth: AuthService) { }
  errorMessages: string = "";
  cart: any[] = [];
  holder: any;

  purchase: IPurchase[] = [];
  // purchaseForm = new FormGroup({
  //   UserId: new FormControl(0),
  //   ItemId: new FormControl(0),
  //   Amount: new FormControl(0),
  //   Bought: new FormControl(new Date(docDate))
  // })

  ngOnInit(): void {
    this.holder = JSON.parse(sessionStorage['cart']);
    console.log(this.holder[0]);

    for (let index = 0; index < this.holder.length; index++) {
      const element = this.holder[index];
      this.cart.push({
        id: Number(element.id),
        name: String(element.name),
        smallImg: String(element.smallImg),
        cardPrice: String(element.card_prices[0].tcgplayer_price),
        amount: Number(element.amount),
      });
    }
    console.log(this.cart);
  }

  RemoveAmount(item: any) {
    if (item.amount == 1) {
    } else {
      this.cart[this.cart.indexOf(item)].amount -= 1;
      // let recurring = this.cart.find((data: any)  => data.id == item.id);
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    // console.log(sessionStorage.getItem('cart'));
  }

  AddAmount(item: any) {
    item.amount += 1;
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  RemoveItem(item: any) {
    this.cart.splice(this.cart.indexOf(item), 1);
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  Purchase() {
    var dateTime = new Date();
    // YYYY-MM-DD HH:MM:SS
    var date =
      dateTime.getFullYear() +
      "-" +
      dateTime.getMonth() +
      "-" +
      dateTime.getDate() +
      " " +
      dateTime.getHours() +
      ":" +
      dateTime.getMinutes() +
      ":" +
      dateTime.getSeconds();
    // console.log(date);
    if (!this._auth.id) {
      this.errorPopupMessages("Du skal logge ind før du kan købe")
    } else {
      for (let index = 0; index < this.cart.length; index++) {
        this.purchase.push({
          UserId: Number(this._auth.id),
          ItemId: Number(this.cart[index].id),
          Amount: Number(this.cart[index].amount),
          Bought: String(date),
        });
      }

      this.api.PurchaseService(this.purchase).subscribe();
      this.purchase = [];
      this.cart = [];
      sessionStorage.removeItem('cart');
    }
  }
  errorPopupMessages(Messages: string) {
    this.errorMessages = Messages
    document.getElementById("errorpopup")?.click();
  }
}
