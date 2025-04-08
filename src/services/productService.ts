import { genericRequest } from "../utils/genericRequestUtils";
import { genericRequestConForm } from "../utils/genericRequestConForm";
import { ICreateProduct } from "../interfaces/ICreateProduct";

// Crear un producto
export const createProductoConImagen = async (formData: FormData) => {
    return await genericRequestConForm("/productos/", "POST", formData, true);
  };

/*export const updateProductoConImagen = async (formData: FormData) => {
    return await genericRequestConForm("/productos/", "PUT", formData, true);
  };

export const updateProduct = async (data: ICreateProduct) => {
  return await genericRequest("/productos/", "PUT", data, true);
}*/

export const updateProducto = async (producto: any, imagenes?: File[]) => {
  if (imagenes && imagenes.length > 0) {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio);
    formData.append('stock', producto.stock);
    formData.append('idCategoria', producto.idCategoria);

    imagenes.forEach((img) => {
      formData.append('imagenes', img);
    });

    return await genericRequestConForm(`/productos/${producto.idProducto}`, 'PUT', formData, true);
  } else {
    return await genericRequest(`/productos/${producto.idProducto}`, 'PUT', producto, true);
  }
};

  
export const getProductos = async () => {
  return await genericRequest("/productos/", "GET", undefined,);
};

export const deleteProduct = async (idProducto: number) => {
    return await genericRequest(`/productos/${idProducto}`, 'DELETE', undefined, true);
  };
  