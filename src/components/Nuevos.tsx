import React, { useEffect, useState } from 'react';
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

const Nuevos: React.FC = () => {
  const [products] = useState<Product[]>(() => getProducts());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const productImages: { [key: number]: string } = {
    1: camisaCasual,
    2: vestidoElegante,
    3: pantalonModa,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Nuevos Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/producto/${product.id}`} className="block border rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={productImages[product.id]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-xl">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-gray-800 font-semibold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nuevos;