import { Producto } from './producto';

export class Item {
    id: number;
    productoId: number;
    facturaID: number;
    cantidad: number; //int
    codigo: string; // max 50
    descripcion: string; //max 300
    precioUnitario: number; //double
    iva: number; // double
    subtotal: number; //double pu*cantidad*ivaPorCiento
    createdAt: Date;
    updatedAt: Date;

    calcularSubtotal(){
        this.subtotal = (this.precioUnitario * this.cantidad) * (1 + (this.iva / 100));
    }
}