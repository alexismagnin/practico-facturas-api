import { Component, OnInit } from '@angular/core';
import { FacturaRepoService } from '../../services/factura-repo.service';

@Component({
  selector: 'app-factura-lista',
  templateUrl: './factura-lista.component.html',
  styleUrls: []
})
export class FacturaListaComponent implements OnInit {

  constructor(private _facturaRepo: FacturaRepoService) { }

  ngOnInit() {
    this._facturaRepo.loadAll();
  }

}
