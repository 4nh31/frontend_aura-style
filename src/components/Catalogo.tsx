import { useState, useEffect } from "react";
import { useProducts } from "../contexts/AllProductsContext";
import IconoFiltro from '../assets/img/IconoFiltro.png';
import CardProduct from "../components/CardProduct"; // Importamos el nuevo componente

// Estructura del array con los datos del producto
{/*interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  color: string;
  tamaño: string;
}*/}


interface FiltroValores {
  categoria: string;
  precio: string;
  color: string;
  tamaño: string;
}


const Catalogo: React.FC = () => {
  // Uso del AllProductsContext.tsx para mandar a llamar a todos los productos existentes
  const { products } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState(products || []);

  // Se que ambas cosas son lo mismo tanto la función de arriba como la de abajo de este comentario, pero me sirve para entender la logica
  // del uso de variables y sobre todo en un contexto local dentro de la vista y otro global con el uso de Context :D

  // Estado para almacenar todos los productos obtenidos del backend [Según la estructura definida por Product para un mejor manejo de datos]
  {/*const [productos, setProductos] = useState<Product[]>([]);*/}
  
  // Estado para almacenar los filtros seleccionados
  const [filtros, setFiltros] = useState<FiltroValores>({
    categoria: "",
    precio: "",
    color: "",
    tamaño: ""
  });

  // Función para aplicar el filtrado
  const applyFilters = () => {
    let filtered = products;

    if (filtros.categoria) {
      filtered = filtered.filter(product => product.categoria === filtros.categoria);
    }

    if (filtros.precio) {
      if (filtros.precio === "$100 - $500") {
        filtered = filtered.filter(product => product.precio >= 100 && product.precio <= 500);
      }
      if (filtros.precio === "$500 - $1,000") {
        filtered = filtered.filter(product => product.precio >= 500 && product.precio <= 1000);
      }
      if (filtros.precio === "$1,000 - $3,000") {
        filtered = filtered.filter(product => product.precio >= 1000 && product.precio <= 3000);
      }
      if (filtros.precio === "Más de $5,000") {
        filtered = filtered.filter(product => product.precio > 5000);
      }
    }

    if (filtros.color) {
      filtered = filtered.filter(product => product.color === filtros.color);
    }

    if (filtros.tamaño) {
      filtered = filtered.filter(product => product.tamaño === filtros.tamaño);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      applyFilters();
    }
  }, [filtros, products]);
  
  // Aquí se almacenan los filtros aplicados, se añaden si no estan seleccionados y se actualizan si lo estaban pero cambió su valor
  const toggleFiltro = (tipo: keyof FiltroValores, valor: string) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [tipo]: prevFiltros[tipo] === valor ? "" : valor,
    }));
  };

  return (
    <div className="Categorias flex">
      <div className='FiltroBarraLateral w-70 h-245 mt-10 ml-12 rounded-2xl border-solid border-black border-1'>
        <div className="w-70 h-15 flex">
            <div className="TituloBarraLateral w-35 h-15">
                  <h3 className="pl-10 pt-5 text-2xl font-serif">Filtro</h3>
            </div>
            <div className="IconoFiltro  w-35 h-15">
                <img src={IconoFiltro} alt="Aura-style Logo" className="pt-4 pl-12 h-10 " />
            </div>
        </div>

        <div className="LineaDivisor border-1 border-gray-200 w-60 ml-5 mr-5 -mt-2 mb-5"></div>

        <div className="OpcionesFiltrado flex-wrap justify-center">
          <div className="TituloTipoProducto items-center flex flex-col border-1 w-30 ml-20 mb-3 rounded-4xl">
            <p className="text-base italic">Categoría</p>
          </div>
          <div className="Botones">
            <button onClick={() => toggleFiltro("categoria", "Lo más vendido")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Lo más vendido" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              ¡Lo más vendido!
            </button>
            <button onClick={() => toggleFiltro("categoria", "Caballero")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Caballero" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              Caballero
            </button>
            <button onClick={() => toggleFiltro("categoria", "Dama")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Dama" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              Dama
            </button>
            <button onClick={() => toggleFiltro("categoria", "Kids")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Kids" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              Kids
            </button>
          </div>
          <div className="Botones mb-5">
            <button onClick={() => toggleFiltro("categoria", "Bolsas")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Bolsas" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              Bolsas
            </button>
            <button onClick={() => toggleFiltro("categoria", "Mochilas")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Mochilas" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              Mochilas
            </button>
            <button onClick={() => toggleFiltro("categoria", "Calzado")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Calzado" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              Calzado
            </button>
            <button onClick={() => toggleFiltro("categoria", "Gorras")} className={`text-sm w-40 ml-15 mr-5 mb-1 hover:border-b-1 hover:font-bold ${filtros.categoria === "Gorras" ? "text-amber-300 border-b-1 font-extrabold" : ""}`}>
              Gorras
            </button>
          </div>

          <div className="LineaDivisor border-1 border-gray-200 w-60 ml-5 mr-5 -mt-2 mb-5"></div>

          <div className="TituloPrecio justify-items-center">
            <h3 className="font-sans text-lg underline italic">PRECIO</h3>
          </div>
          <div className="Precios mb-7">
            <div className="BotonesPrecio">
              <button onClick={() => toggleFiltro("precio", "$100 - $500")} className={`border-1 w-30 ml-20 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.precio === "$100 - $500" ? "bg-yellow-300 font-bold" : ""}`}>
                $100 - $500
              </button>
              <button onClick={() => toggleFiltro("precio", "$500 - $1,000")} className={`border-1 w-30 ml-20 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.precio === "$500 - $1,000" ? "bg-yellow-300 font-bold" : ""}`}>
                $500 - $1,000
              </button>
              <button onClick={() => toggleFiltro("precio", "$1,000 - $3,000")} className={`border-1 w-30 ml-20 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.precio === "$1,000 - $3,000" ? "bg-yellow-300 font-bold" : ""}`}>
                $1,000 - $3,000
              </button>
              <button onClick={() => toggleFiltro("precio", "Más de $5,000")} className={`border-1 w-30 ml-20 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.precio === "Más de $5,000" ? "bg-yellow-300 font-bold" : ""}`}>
                Más de $5,000
              </button>
            </div>
          </div>

          <div className="LineaDivisor border-1 border-gray-200 w-60 ml-5 mr-5 -mt-2 mb-5"></div>

          <div className="TituloTipoProducto items-center flex flex-col border-1 w-30 ml-20 mb-3 mt-3 rounded-4xl">
            <p className="text-base italic">Color</p>
          </div>

          <div className="Colores flex flex-col items-center mb-5">
            <div className="space-x-2">
              <button onClick={() => toggleFiltro("color", "Negro")} className={`w-8 h-8 bg-black rounded-full transition-transform transform ${filtros.color === "Negro" ? "scale-115 border-2 border-yellow-500" : "hover:scale-100"}`}></button>
              <button onClick={() => toggleFiltro("color", "Rojo")} className={`w-8 h-8 bg-red-500 rounded-full transition-transform transform ${filtros.color === "Rojo" ? "scale-115 border-2 border-blue-500" : "hover:scale-100"}`}></button>
              <button onClick={() => toggleFiltro("color", "Azul")} className={`w-8 h-8 bg-blue-500 rounded-full transition-transform transform ${filtros.color === "Azul" ? "scale-115 border-2 border-blue-500" : "hover:scale-100"}`}></button>
            </div>
            <div className="space-x-2">
              <button onClick={() => toggleFiltro("color", "Verde")} className={`w-8 h-8 bg-green-500 rounded-full transition-transform transform ${filtros.color === "Verde" ? "scale-115 border-2 border-blue-500" : "hover:scale-100"}`}></button>
              <button onClick={() => toggleFiltro("color", "Morado")} className={`w-8 h-8 bg-purple-500 rounded-full transition-transform transform ${filtros.color === "Morado" ? "scale-115 border-2 border-blue-500" : "hover:scale-100"}`}></button>
              <button onClick={() => toggleFiltro("color", "Amarillo")} className={`w-8 h-8 bg-yellow-500 rounded-full transition-transform transform ${filtros.color === "Amarillo" ? "scale-115 border-2 border-blue-500" : "hover:scale-100"}`}></button>
            </div>
          </div>

          <div className="LineaDivisor border-1 border-gray-200 w-60 ml-5 mr-5 -mt-2 mb-5"></div>

          <div className="TituloTipoProducto items-center flex flex-col border-1 w-30 ml-20 mb-3 mt-3 rounded-4xl">
            <p className="text-base italic">Tamaño</p>
          </div>

          <div className="Sizes ml-16 mb-5">
            <div className="flex">
              <button onClick={() => toggleFiltro("tamaño", "CH")} className={`border-1 w-15 ml-2 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.tamaño === "CH" ? "bg-yellow-300 font-bold" : ""}`}>
                CH
              </button>
              <button onClick={() => toggleFiltro("tamaño", "MD")} className={`border-1 w-15 ml-2 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.tamaño === "MD" ? "bg-yellow-300 font-bold" : ""}`}>
                MD
              </button>
            </div>
            <div className="flex">
              <button onClick={() => toggleFiltro("tamaño", "G")} className={`border-1 w-15 ml-2 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.tamaño === "G" ? "bg-yellow-300 font-bold" : ""}`}>
                G
              </button>
              <button onClick={() => toggleFiltro("tamaño", "XG")} className={`border-1 w-15 ml-2 mb-1 mt-3 rounded-lg text-xs hover:bg-yellow-300 hover:font-bold ${filtros.tamaño === "XG" ? "bg-yellow-300 font-bold" : ""}`}>
                XG
              </button>
            </div>
          </div>

          <div className="LineaDivisor border-1 border-gray-200 w-60 ml-5 mr-5 -mt-2 mb-5"></div>

          <div className="ml-10">
            <button type="button" onClick={applyFilters} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none  focus:ring-amber-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-50">
              Aplicar Filtro
            </button>
          </div>

        </div>
      </div>
      <div className="Catalogo mt-5 ml-10 w-500">
        <div className="TituloBarraLateral w-35 h-15">
          <h3 className="pl-5 pt-5 text-4xl font-sans font-light italic">Catalogo</h3>
        </div>

        <div className="LineaDivisor border-1 border-black mr-5 mt-2 mb-5 w-270"></div>

        <div className="ProductosCatalogo">
          {/* Aquí hacemos uso del cardProduct con los valores de cada producto encontrado */}
          {Array.isArray(filteredProducts) ? (
  filteredProducts.map(product => (
    <CardProduct key={product.id} product={product} />
  ))
) : (
  <p>No hay productos disponibles</p>
)}

        </div>
      </div>

    </div>
  );
};

export default Catalogo;