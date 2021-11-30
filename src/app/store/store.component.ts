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

  ngOnInit(): void {
    this.products();
  }

  products() {
    this.cards.getAllCards().subscribe((res) => {
      this.cardData = res;
      console.log(this.cardData);
    });
  }
}
