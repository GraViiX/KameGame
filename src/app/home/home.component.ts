import { Component, OnInit } from '@angular/core';
import { YugiohService } from '../Services/yugioh.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cards:YugiohService) { }

  public cardData:any;

  ngOnInit(): void {
    this.products();
  }

  products(){
    this.cards.getCard().subscribe(res => {
      this.cardData = res;
      console.log(this.cardData.data[0]);
      $("#cardImage").attr("src", this.cardData.data[0].card_images[0].image_url.toString());
      $("#display").append(this.cardData.data[0].name.toString());
      $("#effectCard").append(this.cardData.data[0].desc.toString());
    });
  }

}
