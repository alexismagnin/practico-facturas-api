import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/modelo/factura';
import { FacturaRepoService } from '../../services/factura-repo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoRepoService } from 'src/app/services/producto-repo.service';
import { ClienteRepoService } from 'src/app/services/cliente-repo.service';
import { DatePipe } from '@angular/common';
import { Item } from 'src/app/modelo/item';
import { Producto } from 'src/app/modelo/producto';
import { ItemRepoService } from 'src/app/services/item-repo.service';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: [],
  providers: [DatePipe]
})
export class FacturaFormComponent implements OnInit {

  factura: Factura = new Factura();
  detalles: boolean = false;
  itemSeleccionado: Item = new Item();
  productoSeleccionado: Producto = new Producto();
  fechaHoy = new Date();

  constructor(
    private _facturaRepo: FacturaRepoService,
    private _productoRepo: ProductoRepoService,
    private _clienteRepo: ClienteRepoService,
    private _itemRepo: ItemRepoService,
    activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
        {
          this.detalles = _router.url.indexOf('detalle') !== -1;      
          if(this.detalles){
            // el id viene en la ruta (/provincia/editar/1 por ejemplo), se obtiene gracias al obj activatedRoute
            const idFactura: number = parseInt(activatedRoute.snapshot.paramMap.get('idFactura'), 10);
            if(idFactura){
              // si hay un id válido, se obtienen sus datos para editar
              this.obtenerFactura(idFactura);
            } else {
              // el id no es válido: se rechaza el pedido y se navega de vuelta a la pagina anterior
              alert(`Debe especificar un id válido`);
              this.volverAlListado(this._router)
            }
          }
        }
  }

  ngOnInit() {
    this._productoRepo.loadAll();
    this._clienteRepo.loadAll();
  }

  // la factura se obtiene del listado entero cargado repositorio. Se supone que las facturas cargadas no se modifican
  obtenerFactura(idFactura: number) {
    this.factura = this._facturaRepo.getAll().find(factura => factura.id == idFactura);
    if (this.factura == undefined){
      alert(`Factura no encontrado: (${idFactura})`);
      this.volverAlListado(this._router);
    }
  }

  private volverAlListado(router: Router) {
    router.navigate(['/facturas'])
  }

  agregarItem(){
    const producto = this._productoRepo.getAll().find( 
      producto => producto.id == this.itemSeleccionado.productoId
    );
    this.itemSeleccionado.codigo = producto.codigo;
    this.itemSeleccionado.descripcion = producto.descripcion;
    this.itemSeleccionado.precioUnitario = producto.precioUnitario;
    this.itemSeleccionado.calcularSubtotal();
    this.factura.items.push(this.itemSeleccionado);
    this.itemSeleccionado = new Item();
    this.factura.calcularTotal();
  }

  quitarItem(item: Item){
    const index = this.factura.items.indexOf(item);
    this.factura.items.splice(index, 1);
    this.factura.calcularTotal();
  }

  guardar(){
    this._facturaRepo.agregar(this.factura)
      .subscribe(
        nuevaFactura => { //nueva factura trae del servidor los datos bajo el tag "data"
          this.factura.items.forEach((item)=>{
            item.facturaID = nuevaFactura.data.id;
            this._itemRepo.agregar(item)
            .subscribe(
              ()=>{},
              error => {
                alert(`Error de persistencia: ${error.message}`);
              }
            )
          });
          this.volverAlListado(this._router);
        },
        error => {
          alert(`Error de persistencia: ${error.message}`);
        } 
      );
  }

  estaCompleta(): boolean {
    if (
      (this.factura.fecha != null) &&
      (this.factura.puntoVenta != null && this.factura.puntoVenta > 0) &&
      (this.factura.numero != null  && this.factura.numero > 0) &&
      (this.factura.clienteID != null) &&
      (this.factura.tipo != null) &&
      (this.factura.items.length > 0)
    ) return true;
     else return false;
  }
}