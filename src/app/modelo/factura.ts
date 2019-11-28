import { Cliente } from './cliente';
import { Item } from './item';

export class Factura {
    id: number = null;
    tipo: string = null; //char
    fecha: Date = null; //Date
    numero: number = null; //int
    puntoVenta: number; //int
    cliente: Cliente;
    clienteID: number;
    total: number = 0.00; //double
    items: Item[] = [];
    createdAt: Date;
    updatedAt: Date;

    calcularTotal(){
        let suma : number = 0;
        this.items.forEach( (item) => suma = suma + item.subtotal);
        this.total = suma;
    }
}