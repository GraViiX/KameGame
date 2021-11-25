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
  public cardName:string = "";
  url : string = `https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes`;

  getCard(){
    return this.http.get(`${this.url}`, httpOptions);
  }
}

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
