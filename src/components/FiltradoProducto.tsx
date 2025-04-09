import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProducto } from "../interfaces/IProducto";
import { getProductos } from "../services/productService";
import IconoFiltro from '../assets/img/IconoFiltro.png';
import CardProduct from "./CardProduct"; // Importamos el nuevo componente

interface FiltroValores {
  idCategoria: number | string;
  precio: string;
  tamaño: string;
}

const FiltroProducto: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoriaRecibida = location.state?.categoria || ""; // Si no viene nada, por default será ""
  const nombreCategoriaRecibida = location.state?.nombre || ""; // Si no viene nada, por default será ""

  // Estado para almacenar los productos obtenidos de la API
  const [products, setProducts] = useState<IProducto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducto[]>([]);

  // Estado para almacenar los filtros seleccionados
  const [filtros, setFiltros] = useState<FiltroValores>({
    idCategoria: categoriaRecibida,
    precio: "",
    tamaño: "",
  });

  // Obtener productos desde la API al montar el componente
  useEffect(() => {
    if (!categoriaRecibida) {
      navigate("/catalogo"); // Redirige si no se recibe una categoría
    } else {
      const fetchProducts = async () => {
        try {
          const response: IProducto[] = await getProductos();
          console.log("Productos recibidos:", response); // Verifica que los productos llegan correctamente
          setProducts(response);

          // Filtrar inicialmente por la categoría recibida
          const initialFiltered = response.filter(
            (product: IProducto) => product.idCategoria === categoriaRecibida
          );
          setFilteredProducts(initialFiltered);
        } catch (error) {
          console.error("Error al obtener productos:", error);
          alert("Hubo un error al cargar los productos. Inténtalo de nuevo más tarde.");
        }
      };
      fetchProducts();
    }
  }, [categoriaRecibida, navigate]);

  // Función para aplicar el filtrado adicional (precio y tamaño)
  const applyFilters = () => {
    let filtered = products;

    // Filtrar por categoría
    if (filtros.idCategoria) {
      filtered = filtered.filter(
        (product) => product.idCategoria === filtros.idCategoria
      );
    }

    // Filtrar por rango de precio
    if (filtros.precio) {
      if (filtros.precio === "$100 - $500") {
        filtered = filtered.filter(
          (product) =>
            parseFloat(product.precio) >= 100 && parseFloat(product.precio) <= 500
        );
      }
      if (filtros.precio === "$500 - $1,000") {
        filtered = filtered.filter(
          (product) =>
            parseFloat(product.precio) >= 500 && parseFloat(product.precio) <= 1000
        );
      }
      if (filtros.precio === "$1,000 - $3,000") {
        filtered = filtered.filter(
          (product) =>
            parseFloat(product.precio) >= 1000 && parseFloat(product.precio) <= 3000
        );
      }
      if (filtros.precio === "Más de $5,000") {
        filtered = filtered.filter((product) => parseFloat(product.precio) > 5000);
      }
    }

    // Filtrar por tamaño
    if (filtros.tamaño) {
      filtered = filtered.filter((product) => product.tamaño === filtros.tamaño);
    }

    // Actualizar los productos filtrados
    setFilteredProducts(filtered);
  };

  // Aplicar filtros cada vez que cambien los filtros seleccionados
  useEffect(() => {
    applyFilters();
  }, [filtros, products]);

  // Función para actualizar los filtros seleccionados
  const toggleFiltro = (tipo: keyof FiltroValores, valor: string) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [tipo]: prevFiltros[tipo] === valor ? "" : valor,
    }));
  };

  return (
    <div className="Categorias flex">
      <div className='FiltroBarraLateral w-70 h-120 mt-10 ml-12 mb-50 rounded-2xl border-solid border-black border-1'>
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
        <div className="TituloBarraLateral w-35 h-15 flex">
          <h3 className="pl-5 pt-5 text-4xl font-sans font-light italic">{nombreCategoriaRecibida}</h3>
        </div>

        <div className="LineaDivisor border-1 border-black mr-5 mt-2 mb-5 w-270"></div>

        <div className="ProductosCatalogo flex flex-wrap gap-4">
          {Array.isArray(filteredProducts) ? (
            filteredProducts.map(product => (
              <CardProduct key={product.idProducto} product={product} />
            ))
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltroProducto;