import React from "react";
import { useNavigate } from 'react-router-dom';

interface Categoria {
    idCategoria: number;
    nombre: string;
    descripcion: string;
}

const CardCategoria: React.FC<{ categoria: Categoria }> = ({ categoria }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/filtrado", { state: { categoria: categoria.idCategoria } });
    };

    return (
        <div className="p-4">
            <button
                onClick={handleClick}
                className="w-full border border-black text-black text-xl font-semibold py-3 px-6 rounded-full transition duration-300 hover:bg-black hover:text-white"
            >
                {categoria.nombre} {/* Asegúrate de renderizar solo `categoria.nombre` */}
            </button>
        </div>
    );
};

export default CardCategoria;