import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Definir el tipo de producto
interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  categoria: string;
  precio: number;
  color: string;
  tamaño: string;
  imagenPrincipal: string;
  imagenSecundariaUno: string;
  imagenSecundariaDos: string;
}

// Definir el tipo del contexto
interface ProductsContextType {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

// Crear el contexto con valores iniciales
const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Proveedor del contexto
export const AllProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Función para obtener los productos de la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/productos"); // Aquí va la URL de la petición a la API
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos", error);
    }
  };

  // Llamar a fetchProducts cuando el contexto se monte
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Desconozco realmente la finalidad de esta función
// Hook personalizado para usar el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de un ProductsProvider");
  }
  return context;
};