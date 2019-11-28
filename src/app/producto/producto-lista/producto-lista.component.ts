import { Component, OnInit } from '@angular/core';
import { ProductoRepoService } from '../../services/producto-repo.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: []
})
export class ProductoListaComponent implements OnInit {

  constructor(private _prodRepo: ProductoRepoService) { }

  ngOnInit() {
    this._prodRepo.loadAll();
  }

  eliminarProducto(prodcutoID: number) {
    this._prodRepo.borrar(prodcutoID)
      .subscribe(
        () => {
          //this.mostrarMensaje();
          this._prodRepo.loadAll();
        },
        error => {
          alert(`Error de persistencia: ${error.message}`)
        }
      )
  }
}
