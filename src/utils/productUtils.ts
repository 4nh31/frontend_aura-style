import vestidoElegante from '../assets/img/vestidoElegante.jpg';
import camisaCasual from '../assets/img/camisaCasual.jpg';
import pantalonModa from '../assets/img/Pantalon.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  description: string;
}

export function getProducts(): Product[] {
  return [
    { id: 1, name: 'Vestido Elegante', price: 120, size: 'M', color: 'Rojo', image: vestidoElegante, description: 'Un vestido elegante para ocasiones especiales.' },
    { id: 2, name: 'Camisa Casual', price: 45, size: 'S', color: 'Negro', image: camisaCasual, description: 'Una camisa casual para el día a día.' },
    { id: 3, name: 'Pantalón de Moda', price: 60, size: 'L', color: 'Azul', image: pantalonModa, description: 'Un pantalón de moda para cualquier ocasión.' },
    // Agrega más productos según sea necesario
  ];
}