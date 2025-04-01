import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useNavbarContext } from '../contexts/NavbarContext';

import camisaCasual1 from '../assets/img/camisaCasual.jpg';
import camisaCasual2 from '../assets/img/camisaCasual2.png';
import camisaCasual3 from '../assets/img/camisaCasual3.png';

import vestidoElegante1 from '../assets/img/vestidoElegante.jpg';
import vestidoElegante2 from '../assets/img/vestidoElegante2.png';
import vestidoElegante3 from '../assets/img/vestidoElegante3.png';

import pantalon1 from '../assets/img/Pantalon.jpg';
import pantalon2 from '../assets/img/Pantalon2.png';
import pantalon3 from '../assets/img/Pantalon3.png';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[]; // Array de URLs de imágenes adicionales
}

interface Review {
  username: string;
  rating: number;
  comment: string;
}

const DetallesProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const { isLoggedIn, username, openLoginModal } = useNavbarContext(); // Utilizar el contexto del Navbar

  useEffect(() => {
    const storedProducts = [
      {
        id: 1,
        name: 'Vestido Elegante',
        description: 'Un vestido elegante para ocasiones especiales.',
        price: 120,
        image: vestidoElegante1,
        images: [vestidoElegante2, vestidoElegante3],
      },
      {
        id: 2,
        name: 'Camisa Casual',
        description: 'Una camisa casual para el día a día.',
        price: 45,
        image: camisaCasual1,
        images: [camisaCasual2, camisaCasual3],
      },
      {
        id: 3,
        name: 'Pantalón de Moda',
        description: 'Un pantalón de moda para cualquier ocasión.',
        price: 60,
        image: pantalon1,
        images: [pantalon2, pantalon3],
      },
    ];
    const product = storedProducts.find((p: Product) => p.id === parseInt(id!));
    if (product) {
      setProduct(product);
      setMainImage(product.image);
    }

    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`) || '[]');
    setReviews(storedReviews);
  }, [id]);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    const cartItem = { 
      id: product.id, 
      name: product.name, 
      size: "M", 
      color: selectedColor || "Negro", 
      price: product.price, 
      quantity, 
      image: mainImage 
    };
    const storedItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = storedItems.find((item: any) => item.id === cartItem.id);
    let updatedItems;
    if (existingItem) {
      updatedItems = storedItems.map((item: any) => 
        item.id === cartItem.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedItems = [...storedItems, cartItem];
    }
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    setIsModalOpen(true);
  };

  const handleAddReview = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoggedIn) {
      openLoginModal(); // Abrir modal de inicio de sesión del Navbar
      return;
    }

    const newReview: Review = {
      username: username!,
      rating: newRating,
      comment: newComment
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    setNewComment('');
    setNewRating(0);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start md:w-1/2">
          <img src={mainImage} alt={product.name} className="w-full h-96 object-cover mb-4 rounded-md shadow-lg transition-all" />
          <div className="flex space-x-2">
            {[product.image, ...product.images].map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index + 1}`} className="w-24 h-24 object-cover rounded-md shadow-md cursor-pointer" onClick={() => setMainImage(img)} />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-800 font-semibold mb-2">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex space-x-2">
              <button
                className={`w-8 h-8 bg-black rounded-full transition-transform transform ${selectedColor === 'Negro' ? 'scale-125 border-2 border-blue-500' : 'hover:scale-110'}`}
                onClick={() => handleColorSelect('Negro')}
              ></button>
              <button
                className={`w-8 h-8 bg-red-500 rounded-full transition-transform transform ${selectedColor === 'Rojo' ? 'scale-125 border-2 border-blue-500' : 'hover:scale-110'}`}
                onClick={() => handleColorSelect('Rojo')}
              ></button>
              <button
                className={`w-8 h-8 bg-blue-500 rounded-full transition-transform transform ${selectedColor === 'Azul' ? 'scale-125 border-2 border-blue-500' : 'hover:scale-110'}`}
                onClick={() => handleColorSelect('Azul')}
              ></button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Cantidad</h3>
            <div className="flex items-center">
              <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 border rounded-l-md bg-gray-100 hover:bg-gray-200">-</button>
              <span className="px-3 py-1 border-t border-b">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 border rounded-r-md bg-gray-100 hover:bg-gray-200">+</button>
            </div>
          </div>
          <button onClick={handleAddToCart} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">Agregar al Carrito</button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Opiniones</h2>
        {reviews.map((review, index) => (
          <div key={index} className="border-t pt-4 mt-4">
            <p className="font-semibold">{review.username}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927C9.323 2.192 10.677 2.192 10.951 2.927L12.347 6.29L15.99 6.63C16.777 6.707 17.064 7.732 16.499 8.297L13.714 11.083L14.388 14.702C14.507 15.485 13.642 16.03 12.941 15.629L10 13.883L7.059 15.629C6.358 16.03 5.493 15.485 5.612 14.702L6.286 11.083L3.501 8.297C2.936 7.732 3.223 6.707 4.01 6.63L7.653 6.29L9.049 2.927Z" />
                </svg>
              ))}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
        {isLoggedIn ? (
          <form onSubmit={handleAddReview} className="mt-4">
            <h3 className="font-semibold mb-2">Deja tu opinión</h3>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Calificación</label>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewRating(i + 1)}
                    className={`h-5 w-5 ${i < newRating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927C9.323 2.192 10.677 2.192 10.951 2.927L12.347 6.29L15.99 6.63C16.777 6.707 17.064 7.732 16.499 8.297L13.714 11.083L14.388 14.702C14.507 15.485 13.642 16.03 12.941 15.629L10 13.883L7.059 15.629C6.358 16.03 5.493 15.485 5.612 14.702L6.286 11.083L3.501 8.297C2.936 7.732 3.223 6.707 4.01 6.63L7.653 6.29L9.049 2.927Z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Comentario</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
              Enviar Opinión
            </button>
          </form>
        ) : (
          <p className="mt-4">
            <button
              onClick={() => openLoginModal()}
              className="text-blue-500 hover:underline"
            >
              Inicia sesión para dejar una opinión
            </button>
          </p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Producto Agregado"
        className="fixed top-4 right-4 w-64 bg-white p-4 rounded-md shadow-lg z-50"
        overlayClassName="fixed inset-0 bg-transparent"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Éxito</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p>{product.name} ha sido agregado al carrito.</p>
      </Modal>
    </div>
  );
};

export default DetallesProducto;