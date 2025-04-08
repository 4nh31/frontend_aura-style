import React, { useState } from 'react';

interface Category {
  id: number;
  nombre: string;
  descripcion: string;
  parentId: number | null;
}

const AdminCategories: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [parentId, setParentId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
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
  };

  const handleEdit = (id: number) => {
    const category = categories.find(category => category.id === id);
    if (category) {
      setNombre(category.nombre);
      setDescripcion(category.descripcion);
      setParentId(category.parentId);
      setEditCategoryId(id);
    }
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
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
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Nombre</th>
            <th className="py-2">Descripción</th>
            <th className="py-2">Categoría Padre</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id} className="bg-gray-100 border-b">
              <td className="py-2 px-4">{category.id}</td>
              <td className="py-2 px-4">{category.nombre}</td>
              <td className="py-2 px-4">{category.descripcion}</td>
              <td className="py-2 px-4">{category.parentId}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button onClick={() => handleEdit(category.id)} className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-700 transition-colors">Editar</button>
                <button onClick={() => handleDelete(category.id)} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;