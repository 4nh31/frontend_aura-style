import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../utils/productUtils';

import vestidoElegante from '../assets/img/vestidoElegante.jpg';
import camisaCasual from '../assets/img/camisaCasual.jpg';
import pantalonModa from '../assets/img/Pantalon.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const [products] = useState<Product[]>(() => getProducts());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const productImages: { [key: number]: string } = {
    1: vestidoElegante, // Asegurarse de que el ID 1 corresponda a "Vestido Elegante"
    2: camisaCasual,    // Asegurarse de que el ID 2 corresponda a "Camisa Casual"
    3: pantalonModa,    // Asegurarse de que el ID 3 corresponda a "Pantalón de Moda"
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">Bienvenido a Aura-style</h1>
        <p className="text-lg mt-2">Explora las últimas tendencias en moda.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/producto/${product.id}`} className="block border rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={productImages[product.id]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-xl">{product.name}</h2>
              <p>{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;