import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    'src/assets/img/imagen1.jpg', // Imagen 1
    'src/assets/img/imagen2.jpg', // Imagen 2
    'src/assets/img/imagen3.jpg', // Imagen 3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Cambia de imagen cada 3 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [images.length]);

  return (
    <div className="w-full">
      {/* Sección de Banner con Video */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="src/assets/videos/banner.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        {/* Texto superpuesto encima del video */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-white text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Bienvenido a <span className="text-yellow-400">Aura-style</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-slide-in">
            La moda que te define, a un solo clic.
          </p>
          <div className="space-x-4">
            <Link
              to="/Catalogo"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
            >
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Videos Secundarios */}
      <section className="my-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Descubre Más</h2>
          <p className="text-lg text-gray-600">Explora nuestras colecciones en video.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video 1 */}
          <div className="relative group overflow-hidden rounded-md shadow-lg">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
            >
              <source src="src/assets/videos/video1.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
            <div className="absolute inset-0 bg-transparent flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-bold text-xl">Colección Elegante</p>
            </div>
          </div>

          {/* Video 2 */}
          <div className="relative group overflow-hidden rounded-md shadow-lg">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
            >
              <source src="src/assets/videos/video2.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
            <div className="absolute inset-0 bg-transparent flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-bold text-xl">Estilo Casual</p>
            </div>
          </div>

          {/* Video 3 */}
          <div className="relative group overflow-hidden rounded-md shadow-lg">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
            >
              <source src="src/assets/videos/video3.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
            <div className="absolute inset-0 bg-transparent flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-bold text-xl">Tendencias Modernas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuevo Carrusel */}
      <section className="my-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Nuestras Colecciones</h2>
          <p className="text-lg text-gray-600">Moda diseñada para destacar.</p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-md shadow-lg">
          <div className="relative">
            <img
              src={images[currentSlide]}
              alt={`Imagen ${currentSlide + 1}`}
              className="w-full h-96 object-contain mx-auto transition-opacity duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;