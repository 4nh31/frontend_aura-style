import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Category } from '../interfaces/Category';
import { createCategory, updateCategoria, getcategory, deleteCategoria } from '../services/categoriaService';
import SearchBar from './SearchBar'; // Importar SearchBar

Modal.setAppElement('#root'); // Configurar el elemento raíz para los modales

const AdminCategories: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [parentId, setParentId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal de éxito para edición
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false); // Modal de éxito para eliminación

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getcategory();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category: Category) => {
    // Seleccionar una categoría desde el buscador
    setNombre(category.nombre);
    setDescripcion(category.descripcion);
    setParentId(category.parentId);
    setEditCategoryId(category.idCategoria);
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getcategory();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCategory: Omit<Category, 'idCategoria'> = {
      nombre,
      descripcion,
      parentId,
    };

    try {
      if (editCategoryId !== null) {
        // Actualizar categoría
        await updateCategoria(editCategoryId, newCategory as Category);
        const updatedList = categories.map(category =>
          category.idCategoria === editCategoryId
            ? { idCategoria: editCategoryId, ...newCategory }
            : category
        );
        setCategories(updatedList);
        setEditCategoryId(null);
        setIsSuccessModalOpen(true); // Abrir modal de éxito para edición
      } else {
        // Crear nueva categoría
        const created = await createCategory(newCategory as Category);
        setCategories([...categories, created]);
        window.location.reload(); // Recargar la página después de agregar
      }

      // Limpiar campos
      setNombre('');
      setDescripcion('');
      setParentId(null);
    } catch (error) {
      console.error('Error al crear o actualizar la categoría', error);
    }
  };

  const handleEdit = (id: number) => {
    const category = categories.find(category => category.idCategoria === id);
    if (category) {
      setNombre(category.nombre);
      setDescripcion(category.descripcion);
      setParentId(category.parentId);
      setEditCategoryId(id); // Activar el modo de edición
    }
  };

  const handleCancelEdit = () => {
    // Limpiar los campos y salir del modo de edición
    setNombre('');
    setDescripcion('');
    setParentId(null);
    setEditCategoryId(null);
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category); // Establecer la categoría seleccionada
    setIsDeleteModalOpen(true); // Abrir el modal de eliminación
  };

  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setIsDeleteModalOpen(false); // Cerrar el modal de eliminación
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false); // Cerrar el modal de éxito para edición
  };

  const closeDeleteSuccessModal = () => {
    setIsDeleteSuccessModalOpen(false); // Cerrar el modal de éxito para eliminación
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategoria(categoryToDelete.idCategoria);
      setCategories(categories.filter(category => category.idCategoria !== categoryToDelete.idCategoria));
      closeDeleteModal(); // Cerrar el modal de eliminación
      setIsDeleteSuccessModalOpen(true); // Abrir modal de éxito para eliminación
    } catch (error) {
      console.error('Error al eliminar la categoría', error);
      alert('Hubo un error al eliminar la categoría.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Administrar Categorías</h2>

      {/* Integrar SearchBar */}
      <SearchBar onCategorySelect={handleCategorySelect} />

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
        {/* Ocultar input de categoría padre */}
        <div className="hidden">
          <label className="block text-gray-700 mb-2">Categoría Padre (ID)</label>
          <input
            type="number"
            value={parentId ?? ''}
            onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : null)}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {editCategoryId !== null ? 'Actualizar Categoría' : 'Agregar Categoría'}
          </button>
          {editCategoryId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">ID</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Nombre</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Descripción</th>
            <th className="py-3 px-6 text-left font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {categories.map((category) => (
            <tr key={category.idCategoria} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-6">{category.idCategoria}</td>
              <td className="py-3 px-6 font-medium">{category.nombre}</td>
              <td className="py-3 px-6">{category.descripcion}</td>
              <td className="py-3 px-6 flex space-x-2">
                <button
                  onClick={() => handleEdit(category.idCategoria)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => openDeleteModal(category)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de advertencia para eliminar */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4 text-red-600">⚠️ Confirmar Eliminación</h2>
        <p className="mb-4">
          ¿Estás seguro de que deseas eliminar la categoría{' '}
          <span className="font-bold">{categoryToDelete?.nombre}</span>? Esta acción no se puede deshacer.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Sí, Eliminar
          </button>
          <button
            onClick={closeDeleteModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </Modal>

      {/* Modal de éxito para edición */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Actualización Exitosa</h2>
        <p className="mb-4">La categoría se ha actualizado correctamente.</p>
        <div className="flex justify-end">
          <button
            onClick={closeSuccessModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </Modal>

      {/* Modal de éxito para eliminación */}
      <Modal
        isOpen={isDeleteSuccessModalOpen}
        onRequestClose={closeDeleteSuccessModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Eliminación Exitosa</h2>
        <p className="mb-4">La categoría se ha eliminado correctamente.</p>
        <div className="flex justify-end">
          <button
            onClick={closeDeleteSuccessModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </Modal>

      <style>{`
        .modal-style {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 1000;
          max-width: 400px;
          width: 100%;
        }

        .overlay-style {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
      `}</style>
    </div>
  );
};

export default AdminCategories;