import { Component, OnInit } from '@angular/core';
import { YugiohService } from '../Services/yugioh.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cards:YugiohService) { }

  public cardData:any;
  public cardList:any = [];
  public cart:any = [];

  ngOnInit(): void {
    this.products();
  }

  AddToCart(item:any){
    this.cart.push({
      "id": item.id,
      "name": item.name,
      "smallImg": item.imgUrlSmall
    });
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(sessionStorage.getItem('cart'));
  }

  products(){
    this.cards.getCard().subscribe(res => {
      this.cardData = res;
      //console.log(this.cardData.data);
      for (let index = 0; index < this.cardData.data.length; index++) {
        const element = this.cardData.data[index];
        this.cardList.push({
        "id": element.id,
        "name": element.name,
        "imgUrl": element.card_images[0].image_url,
        "imgUrlSmall": element.card_images[0].image_url_small,
        "desc": element.desc
        });
      }
      //console.log(this.cardList);
    });
  }
}
