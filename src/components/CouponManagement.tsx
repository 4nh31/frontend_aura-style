import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Coupon } from '../interfaces/Coupon';
import { getCupones, deleteCupon, updateCupon, createCupones } from '../services/cuponesServices';

Modal.setAppElement('#root'); // Configurar el elemento raíz para los modales

const CouponManagement: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [discountValue, setDiscountValue] = useState<number | string>('');
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCupones();
        if (Array.isArray(response)) {
          const adaptedCoupons = response.map((coupon: any) => ({
            idCupon: coupon.idCupon,
            codigo: coupon.codigo,
            expirationDate: new Date(coupon.fecha_expiracion).toISOString().split('T')[0],
            discountValue: parseFloat(coupon.valor_descuento),
          }));
          setCoupons(adaptedCoupons);
        } else {
          console.error('Unexpected response format for coupons:', response);
          setCoupons([]);
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
        setCoupons([]);
      }
    };

    fetchCoupons();
  }, []);

  const handleAddCoupon = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCoupon = {
      codigo: couponCode,
      expirationDate,
      discountValue: parseFloat(discountValue as string),
    };

    try {
      if (editingCoupon) {
        await updateCupon(editingCoupon.idCupon, newCoupon);
        const updatedCoupons = coupons.map(coupon =>
          coupon.idCupon === editingCoupon.idCupon ? { ...coupon, ...newCoupon } : coupon
        );
        setCoupons(updatedCoupons);
        setEditingCoupon(null);
      } else {
        await createCupones(newCoupon);
        // Recargar la página después de agregar un cupón
        window.location.reload();
      }

      // Mostrar modal de éxito
      setIsSuccessModalOpen(true);

      // Limpiar el formulario
      setCouponCode('');
      setExpirationDate('');
      setDiscountValue('');
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponCode(coupon.codigo);
    setExpirationDate(coupon.expirationDate);
    setDiscountValue(coupon.discountValue);
  };

  const handleCancelEdit = () => {
    // Limpiar los campos del formulario y salir del modo de edición
    setEditingCoupon(null);
    setCouponCode('');
    setExpirationDate('');
    setDiscountValue('');
  };

  const openWarningModal = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setIsWarningModalOpen(true);
  };

  const closeWarningModal = () => {
    setCouponToDelete(null);
    setIsWarningModalOpen(false);
  };

  const confirmDeleteCoupon = async () => {
    if (!couponToDelete) return;

    try {
      await deleteCupon(couponToDelete.idCupon);
      const updatedCoupons = coupons.filter(coupon => coupon.idCupon !== couponToDelete.idCupon);
      setCoupons(updatedCoupons);

      // Cerrar el modal de advertencia y mostrar el modal de éxito
      closeWarningModal();
      setIsDeleteSuccessModalOpen(true);
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const closeDeleteSuccessModal = () => {
    setIsDeleteSuccessModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingCoupon ? 'Editar Cupón' : 'Agregar Nuevo Cupón'}
      </h2>
      <form onSubmit={handleAddCoupon} className="space-y-4 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Código del Cupón</label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Fecha de Expiración</label>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Valor del Descuento</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {editingCoupon ? 'Actualizar Cupón' : 'Agregar Cupón'}
          </button>
          {editingCoupon && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Cupones Existentes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Código</th>
              <th className="py-2 px-4 text-left">Fecha de Expiración</th>
              <th className="py-2 px-4 text-left">Valor del Descuento</th>
              <th className="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon.idCupon} className="border-b">
                <td className="py-2 px-4">{coupon.codigo}</td>
                <td className="py-2 px-4">{coupon.expirationDate}</td>
                <td className="py-2 px-4">{coupon.discountValue}%</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEditCoupon(coupon)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => openWarningModal(coupon)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de advertencia para eliminar */}
      <Modal
        isOpen={isWarningModalOpen}
        onRequestClose={closeWarningModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4 text-red-600">⚠️ Confirmar Eliminación</h2>
        <p className="mb-4">
          ¿Estás seguro de que deseas eliminar el cupón{' '}
          <span className="font-bold">{couponToDelete?.codigo}</span>? Esta acción no se puede deshacer.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={confirmDeleteCoupon}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Sí, Eliminar
          </button>
          <button
            onClick={closeWarningModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </Modal>

      {/* Modal de éxito para edición o creación */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeSuccessModal}
        className="modal-style"
        overlayClassName="overlay-style"
      >
        <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Operación Exitosa</h2>
        <p className="mb-4">El cupón se ha agregado o actualizado exitosamente.</p>
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
        <p className="mb-4">El cupón se ha eliminado exitosamente.</p>
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

export default CouponManagement;