import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../modelo/cliente';
import { Observable } from 'rxjs';

interface ServerData {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteRepoService {

  ENDPOINT = "http://localhost:4000/api/clientes";

  private listaClientes: Cliente[] = [];

  constructor(private _httpClient: HttpClient) { }

  loadAll() {
    return new Promise ((success , reject) => {
      this._httpClient.get<ServerData>(this.ENDPOINT)
      .subscribe(
        datos => {
          this.listaClientes = datos.data;
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
    return this.listaClientes;
  }

  getById(clienteID:number): Observable<ServerData> {
    return this._httpClient.get<ServerData>(`${this.ENDPOINT}/${clienteID}`)
  }

  agregar(nuevoCliente:Cliente): Observable<any> {
    return this._httpClient.post(this.ENDPOINT, nuevoCliente)
  }

  borrar(clienteID:number): Observable<any> {
    return this._httpClient.delete(`${this.ENDPOINT}/${clienteID}`)
  }

  actualizar(cliente:Cliente): Observable<any> {
    return this._httpClient.put(`${this.ENDPOINT}/${cliente.id}`, cliente)
  }

}