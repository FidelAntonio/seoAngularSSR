import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface GoogleObj {
  q: string[];
  target: string ;
  }
@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  key = 'AIzaSyA0WpuZC_xZhClqZScuwrw3xLIVvZwru_Y';
  constructor(private http: HttpClient) { }
  translate(obj: GoogleObj) {
    // console.log(obj,'service');
    return this.http.post(this.url + this.key, obj);
    }
}
