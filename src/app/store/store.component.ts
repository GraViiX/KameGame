import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { YugiohService } from '../Services/yugioh.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private cards: YugiohService) { }
  public cardData: any;
  public cart: any = [];

  ngOnInit(): void {
    this.products();
  }

  AddToCart(item: any) {
    let recurring = this.cart.find((data: any)  => data.id == item.id);

    if (recurring != null) {
      this.cart[this.cart.indexOf(recurring)].amount += 1;
    }
    else {
      this.cart.push({
        id: item.id,
        name: item.name,
        smallImg: item.imgUrlSmall,
        amount: 1
      });
    }

    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(sessionStorage.getItem('cart'));
  }

  nextPage(){
    this.cards.nextOffSet(this.cardData.meta.next_page).subscribe((res) =>{
      this.cardData = res;
      console.log(this.cardData);
    });
  }

  prevPage(){
    this.cards.nextOffSet(this.cardData.meta.previous_page).subscribe((res) =>{
      this.cardData = res;
    });
  }

  products() {
    this.cards.getAllCards().subscribe((res) => {
      this.cardData = res;
    });
  }
}
