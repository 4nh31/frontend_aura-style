export interface IProducto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    idCategoria: number | string; // Permitimos que sea tanto número como string por flexibilidad
    precio: number; // Cambiado a number para facilitar cálculos
    stock: number; // Cambiado a "stock" en lugar de "stok"
    imagenPrincipal: string;
  }