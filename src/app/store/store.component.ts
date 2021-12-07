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
  holder: any;
  type: string = "";
  Attribute: string = "";
  Race: string = "";
  Effect: string = "";

  public Searchform = new FormGroup({
    Search: new FormControl('')
  })
  ngOnInit(): void {
    this.products();
    this.Searchbar();
    this.holder = JSON.parse(sessionStorage['cart']);
    console.log(this.holder[0]);

    for (let index = 0; index < this.holder.length; index++) {
      const element = this.holder[index];
      this.cart.push({
        id: Number(element.id),
        name: String(element.name),
        smallImg: String(element.smallImg),
        cardPrice: String(element.cardPrice),
        amount: Number(element.amount)
      });
    }
    console.log(this.cart);

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
        smallImg: item.card_images[0].image_url_small,
        cardPrice: item.cardPrice,
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
      this.cards.searchCard(input, this.type, this.Attribute, this.Race, this.Effect).subscribe((res) => {
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

  onChangetype(type: any) {
    console.log(type.target.value);
    if(type.target.value == "Select Card Type"){
      this.type = "";
    }else{
      this.type = type.target.value;
    }
  }

  onChangeAttribute(Attribute: any) {
    console.log(Attribute.target.value);
    if(Attribute.target.value == "Select Attribute"){
      this.Attribute = "";
    }else{
      this.Attribute = Attribute.target.value;
    }
  }

  onChangeRace(Race: any) {
    console.log(Race.target.value);
    if(Race.target.value == "Select Race"){
      this.Race == "";
    }else{
      this.Race = Race.target.value;
    }
  }

  onChangeEffect(Effect:any){
    console.log(Effect.target.value);
    if(Effect.target.value == "Select Card Effect"){
      this.Effect = "";
    }else{
      this.Effect = Effect.target.value;
    }
  }

  filtercards(){

  }
}
