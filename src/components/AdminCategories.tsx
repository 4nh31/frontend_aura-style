import React, { useState } from 'react';
import { Category } from '../interfaces/Category';
import { createCategory, updateCategoria } from '../services/categoriaService';
import { getcategory } from '../services/categoriaService';
import { useEffect } from 'react';
import { deleteCategoria } from '../services/categoriaService';

const AdminCategories: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [parentId, setParentId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getcategory();
        setCategories(data); // Suponiendo que el backend devuelve un array de categorías
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };

    fetchCategories();
  }, []);

  /*const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editCategoryId !== null) {
      setCategories(categories.map(category => category.id === editCategoryId ? { id: editCategoryId, nombre, descripcion, parentId } : category));
      setEditCategoryId(null);
    } else {
      setCategories([...categories, { id: categories.length + 1, nombre, descripcion, parentId }]);
    }
    setNombre('');
    setDescripcion('');
    setParentId(null);
  };*/


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCategory: Omit<Category, 'idCategoria'> = {
      nombre,
      descripcion,
      parentId,
    };

    try {
      if (editCategoryId !== null) {
        // Lógica para actualizar categoría (a futuro puedes implementar esto)
        await updateCategoria(editCategoryId, newCategory as Category);
        const updatedList = categories.map(category =>
          category.idCategoria === editCategoryId
            ? { idCategoria: editCategoryId, ...newCategory }
            : category
        );
        setCategories(updatedList);
        setEditCategoryId(null);
        setEditCategoryId(null);
      } else {
        const created = await createCategory(newCategory as Category);
        setCategories([...categories, created]); // asumimos que el backend devuelve la categoría creada con ID
      }

      // Limpiar campos
      setNombre('');
      setDescripcion('');
      setParentId(null);
    } catch (error) {
      console.error('Error al crear la categoría', error);
    }
  };


  const handleEdit = (id: number) => {
    const category = categories.find(category => category.idCategoria === id);
    if (category) {
      setNombre(category.nombre);
      setDescripcion(category.descripcion);
      setParentId(category.parentId);
      setEditCategoryId(id);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      await deleteCategoria(id);
      setCategories(categories.filter(category => category.idCategoria !== id));
    } catch (error) {
      console.error('Error al eliminar la categoría', error);
      alert('Hubo un error al eliminar la categoría.');
    }
  };


  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Administrar Categorías</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border px-4 py-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Categoría Padre (ID)</label>
          <input
            type="number"
            value={parentId ?? ''}
            onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : null)}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          {editCategoryId !== null ? 'Actualizar Categoría' : 'Agregar Categoría'}
        </button>
      </form>
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">ID</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Nombre</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Descripción</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Categoría Padre</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {categories.map((category) => (
            <tr key={category.idCategoria} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-6">{category.idCategoria}</td>
              <td className="py-3 px-6 font-medium">{category.nombre}</td>
              <td className="py-3 px-6">{category.descripcion}</td>
              <td className="py-3 px-6">
                {category.parentId !== null ? (
                  <span className="text-blue-600 font-medium">#{category.parentId}</span>
                ) : (
                  <span className="text-gray-500 italic">Sin categoría padre</span>
                )}
              </td>
              <td className="py-3 px-6 flex space-x-2">
                <button
                  onClick={() => handleEdit(category.idCategoria)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(category.idCategoria)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AdminCategories;