import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../Interface/iuser';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class YugiohService {
  constructor(private http:HttpClient) { }
  public cardName : string = "";
  urlStaple : string = `https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes`;
  urlAll : string = `https://db.ygoprodeck.com/api/v7/cardinfo.php?&num=32&offset=0&view=List&misc=yes`
  urlSearch : string = `https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=${this.cardName}&desc=${this.cardName}&num=32&offset=0&view=List&misc=yes`

  getStaple(){
    return this.http.get(`${this.urlStaple}`, httpOptions);
  }

  getAllCards(){
    return this.http.get(`${this.urlAll}`, httpOptions);
  }

  nextOffSet(nextPage : string){
    this.urlAll = nextPage;
    return this.http.get(`${this.urlAll}`, httpOptions);
  }

  prevOffSet(prevPage : string){
    this.urlAll = prevPage;
    return this.http.get(`${this.urlAll}`, httpOptions);
  }

  searchCard(cardSearch : string){
    this.cardName = cardSearch;
  }

}



//https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=magician&desc=magician&num=32&offset=0&view=List&misc=yes

//#region data i want
/*"card_images": [
  {
    "id": 6983839,
    "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/6983839.jpg",
    "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/6983839.jpg"
  }
],
"data": [
    {
      "id": 6983839,
      "name": "Tornado Dragon",
      "type": "XYZ Monster",
      "desc": "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
      "atk": 2100,
      "def": 2000,
      "level": 4,
      "race": "Wyrm",
      "attribute": "WIND",*/
//#endregion
