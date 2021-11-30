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

  cart: any[] = [];
  holder: any;

  ngOnInit(): void {
    this.holder = JSON.parse(sessionStorage['cart']);
    console.log(this.holder[0]);

    for (let index = 0; index < this.holder.length; index++) {
      const element = this.holder[index];
      this.cart.push({
        id: Number(element.id),
        name: String(element.name),
        smallImg: String(element.smallImg),
        amount: Number(element.amount)
      });
    }
    console.log(this.cart);
  }

  RemoveAmount(item: any){
    if(item.amount == 1){

    }
    else {
      this.cart[this.cart.indexOf(item)].amount -= 1;
      // let recurring = this.cart.find((data: any)  => data.id == item.id);
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(sessionStorage.getItem('cart'));
  }

  AddAmount(item: any){
    item.amount += 1;
  }

  RemoveItem(item: any){

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
