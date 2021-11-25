import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostcode } from '../Interface/ipostcode';

@Injectable({
  providedIn: 'root'
})
export class PostcodeService {

  constructor(private http:HttpClient) { }

  url : string = "https://localhost:44349/api/PostcodeModels/";
  getPostcodes():Observable<IPostcode[]>{
    return this.http.get<IPostcode[]>(`${this.url}`);
  }
}
