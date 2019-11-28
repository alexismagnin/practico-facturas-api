import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../modelo/item';

@Injectable({
  providedIn: 'root'
})
export class ItemRepoService {

  ENDPOINT = "http://localhost:4000/api/items";

  constructor( private _httpClient: HttpClient ) { }

  agregar(nuevoItem:Item): Observable<any> {
    return this._httpClient.post(this.ENDPOINT, nuevoItem)
  }
}