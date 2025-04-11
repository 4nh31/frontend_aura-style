import React, { useState, useEffect } from 'react';
import { Category } from '../interfaces/Category';
import { getcategory } from '../services/categoriaService';

interface SearchBarProps {
  onCategorySelect: (category: Category) => void; // Callback para seleccionar una categoría
}

const SearchBar: React.FC<SearchBarProps> = ({ onCategorySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Cargar las categorías al inicio
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getcategory();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  // Actualizar los resultados de búsqueda en tiempo real
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filteredResults = categories.filter((category) =>
        category.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, categories]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectCategory = (category: Category) => {
    onCategorySelect(category); // Notificar al componente padre sobre la selección
    setSearchQuery(''); // Limpiar el campo de búsqueda
    setSearchResults([]); // Limpiar los resultados
  };

  // Función para resaltar las coincidencias
  const highlightMatch = (text: string, query: string) => {
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <strong key={index}>{part}</strong> // Resaltar en negritas
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-1/3">
      {/* Campo de entrada */}
      <input
        type="text"
        placeholder="Buscar categorías..."
        className="border px-4 py-2 rounded-full shadow-sm w-full"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Lista desplegable de resultados */}
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg z-50">
          {searchResults.map((category) => (
            <div
              key={category.idCategoria}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectCategory(category)}
            >
              {/* Nombre de la categoría con coincidencias resaltadas */}
              <span className="text-gray-800">
                {highlightMatch(category.nombre, searchQuery)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;