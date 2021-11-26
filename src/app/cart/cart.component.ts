import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICart } from '../Interface/icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor() {}

  cart: ICart[] = [];
  holder: any;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    if (sessionStorage['cart'] != null) {
      this.holder = JSON.parse(sessionStorage['cart']);
      // console.log(this.holder + "test");

      // this.holder.forEach(element => {
      //   this.cart.
      // });
      for (let index = 0; index < this.holder.length; index++) {
        const element = this.holder[index];
        this.cart.push({
          itemId: Number(element.id),
          itemName: String(element.name),
          itemUrlSmall: String(element.smallImg),
          amount: Number(element.amount)
        });
      }
    } else if(sessionStorage['cart'] == null) {
      this.cart.length = 0;
    }

    // this.cards.getCard().subscribe(res => {
    //   this.cardData = res;
    //   //console.log(this.cardData.data);
    //   for (let index = 0; index < this.cardData.data.length; index++) {
    //     const element = this.cardData.data[index];
    //     this.cardList.push({
    //     "id": element.id,
    //     "name": element.name,
    //     "imgUrl": element.card_images[0].image_url,
    //     "imgUrlSmall": element.card_images[0].image_url_small,
    //     "desc": element.desc
    //     });
    //   }
    //   // console.log(this.cardList);
    // });
  }
}
