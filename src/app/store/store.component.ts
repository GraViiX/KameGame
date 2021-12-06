import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public Searchform = new FormGroup({
    Search: new FormControl('')
  })
  ngOnInit(): void {
    this.products();
    this.Searchbar();
  }

  AddToCart(item: any) {
    let recurring = this.cart.find((data: any) => data.id == item.id);

    if (recurring != null) {
      this.cart[this.cart.indexOf(recurring)].amount += 1;
    }
    else {
      this.cart.push({
        id: item.id,
        name: item.name,
        smallImg: item.imgUrlSmall,
        cardPrice: item.card_prices[0].tcgplayer_price,
        amount: 1
      });
    }

    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(sessionStorage.getItem('cart'));
  }

  nextPage() {
    this.cards.nextOffSet(this.cardData.meta.next_page).subscribe((res) => {
      this.cardData = res;
      console.log(this.cardData);
    });
  }

  prevPage() {
    this.cards.nextOffSet(this.cardData.meta.previous_page).subscribe((res) => {
      this.cardData = res;
    });
  }

  Searchbar() {
    this.Searchform.get('Search')?.valueChanges.subscribe((input) => {
      this.cards.searchCard(input).subscribe((res)=>{
        this.cardData = res;
        console.log(this.cardData);
      })
    })
  }

  products() {
    this.cards.getAllCards().subscribe((res) => {
      this.cardData = res;
    });
  }
}
