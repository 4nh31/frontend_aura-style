import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Vestido Elegante' },
  { id: 2, name: 'Camisa Casual' },
  { id: 3, name: 'Pantalón de Moda' },
];

const ProductList: React.FC = () => {
  return (
    <div>
      {products.map((product) => (
        <Link key={product.id} to={`/producto/${product.id}`}>
          {product.name}
        </Link>
      ))}
    </div>
  );
};

export default ProductList;