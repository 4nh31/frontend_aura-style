import React from "react";

interface CardCarritoProductoProps {
  idProducto: number;
  nombre: string;
  imagenPrincipal: string;
  precio: number;
  cantidad: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveProduct: (productId: number) => void;
}

const CardCarritoProducto: React.FC<CardCarritoProductoProps> = ({
  idProducto,
  nombre,
  imagenPrincipal,
  precio,
  cantidad,
  onUpdateQuantity,
  onRemoveProduct,
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(idProducto, cantidad + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      onUpdateQuantity(idProducto, cantidad - 1);
    } else {
      alert("La cantidad debe ser mayor a 0.");
    }
  };

  const handleRemove = () => {
    onRemoveProduct(idProducto);
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <img
      src={`http://localhost:3000${imagenPrincipal}`}
      alt={nombre}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1 ml-4">
        <h3 className="font-bold">{nombre}</h3>
        <p>${precio.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span className="mx-2">{cantidad}</span>
        <button
          onClick={handleIncrement}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
      <button
        onClick={handleRemove}
        className="px-4 py-2 bg-red-500 text-white rounded ml-4"
      >
        Eliminar
      </button>
    </div>
  );
};

export default CardCarritoProducto;