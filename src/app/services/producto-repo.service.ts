import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelo/producto';

interface ServerData {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoRepoService {

  ENDPOINT = "http://localhost:4000/api/productos";

  private listaProductos: Producto[] = [];

  constructor(private _httpClient: HttpClient) { }

  loadAll() {
    return new Promise ((success , reject) => {
      this._httpClient.get<ServerData>(this.ENDPOINT)
      .subscribe(
        datos => {
          this.listaProductos = datos.data;
          success();
        },
        err => {
          alert(`Error al obtener los datos: \n${err.message}`);
          reject(err);
        }
      );
    });
  }

  getAll(){
    return this.listaProductos;
  }

  getById(productoID:number): Observable<ServerData> {
    return this._httpClient.get<ServerData>(`${this.ENDPOINT}/${productoID}`);
  }

  agregar(nuevoProducto:Producto): Observable<any> {
    return this._httpClient.post(this.ENDPOINT, nuevoProducto)
  }

  borrar(productoID:number): Observable<any> {
    return this._httpClient.delete(`${this.ENDPOINT}/${productoID}`)
  }

  actualizar(producto:Producto): Observable<any> {
    return this._httpClient.put(`${this.ENDPOINT}/${producto.id}`, producto)
  }

}