import React, { useState, useEffect } from 'react';
import ImgCategoriaLoMasVendido1 from "../assets/img/CategoriaLoMasVendido.webp";
import ImgCategoriaLoMasVendido2 from "../assets/img/LoMasVendido2.webp";
import ImgCategoriaLoMasVendido3 from "../assets/img/LoMasVendido3.jpg";
import CardCategoria from "./CardCategoria"; // Importamos el componente CardCategoria
import { getcategory } from "../services/categoriaService"; // Importamos el servicio para obtener categorías

interface Categoria {
  idCategoria: number;
  nombre: string;
  descripcion: string;
}

const Catalogo: React.FC = () => {

  const carruselImgs = [
    ImgCategoriaLoMasVendido1,
    ImgCategoriaLoMasVendido2,
    ImgCategoriaLoMasVendido3,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Estado para almacenar las categorías

  // Cambiar imágenes del carrusel automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carruselImgs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Obtener las categorías desde la API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getcategory();
        console.log("Categorías obtenidas:", response); // Verificar que las categorías se obtienen correctamente
        setCategorias(response); // Guardar las categorías en el estado
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        alert("Hubo un error al cargar las categorías. Inténtalo más tarde.");
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div className="DivPrincipal">
      <section>
        <div className="text-center mt-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-emerald-950 tracking-wide mt-12 mb-6">
            Descubre nuestro catálogo
          </h1>
        </div>
        <div className="SeccionLoMasVendido flex mt-10">
          <div className="pl-12">
            <img
              src={carruselImgs[currentIndex]}
              alt="¡Lo más vendido!"
              className="w-[850px] h-[430px] rounded-3xl object-cover transition-opacity duration-500"
            />
          </div>
          <div className="mr-30 ml-20 justify-center items-center flex flex-col text-center">
            <h1 className="mb-1 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-amber-500 from-amber-300">
                ¡Lo más vendido!
              </span>
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Explora los productos más vendidos del momento. ¡Tu nuevo favorito está aquí!
            </p>
            <button className="mt-6 text-2xl text-[#f2f2f2] hover:bg-amber-50 hover:text-[#002b33] hover:border-[#002b33] hover:border-1 bg-[#002b33] py-2 px-16 rounded-full">
              Ver Productos
            </button>
          </div>
        </div>

        <div className="TituloCategoria mt-25">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#002b33] tracking-wide mt-12 mb-6">
            Categorías
          </h1>
          <p className="text-center text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestras colecciones cuidadosamente seleccionadas. Encuentra tu estilo ideal entre las categorías más destacadas.
          </p>
        </div>

        <div className="grid py-5 lg:grid-cols-2 lge:grid-cols-2 md:grid-cols-1 mdsm:grid-cols-1 sm:grid-cols-1">
          {/* Renderizar dinámicamente las categorías */}
          {categorias.map((categoria) => (
            <CardCategoria key={categoria.idCategoria} categoria={categoria} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalogo;