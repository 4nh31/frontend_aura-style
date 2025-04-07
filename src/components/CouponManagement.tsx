import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Coupon {
  id: number;
  code: string;
  discount: number;
}

const CouponManagement: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState<number | string>('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cupones'); // Update URL to your backend server
        if (Array.isArray(response.data)) {
          setCoupons(response.data);
        } else {
          console.error('Unexpected response format for coupons:', response.data);
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
    if (editingCoupon) {
      const updatedCoupon = {
        ...editingCoupon,
        code: couponCode,
        discount: parseFloat(discount as string),
      };
      const response = await axios.put(`http://localhost:3000/api/cupones/${editingCoupon.id}`, updatedCoupon); // Update URL to your backend server
      const updatedCoupons = coupons.map(coupon =>
        coupon.id === editingCoupon.id ? response.data : coupon
      );
      setCoupons(updatedCoupons);
      setEditingCoupon(null);
    } else {
      const newCoupon = {
        code: couponCode,
        discount: parseFloat(discount as string),
      };
      const response = await axios.post('http://localhost:3000/api/cupones', newCoupon); // Update URL to your backend server
      setCoupons([...coupons, response.data]);
    }

    // Clear the form
    setCouponCode('');
    setDiscount('');
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponCode(coupon.code);
    setDiscount(coupon.discount);
  };

  const handleDeleteCoupon = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/cupones/${id}`); // Update URL to your backend server
    const updatedCoupons = coupons.filter(coupon => coupon.id !== id);
    setCoupons(updatedCoupons);
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
            <label className="block text-gray-700 mb-2">Descuento (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
          {editingCoupon ? 'Actualizar Cupón' : 'Agregar Cupón'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Cupones Existentes</h2>
      <div className="overflow-x-auto">
        {Array.isArray(coupons) ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Código</th>
                <th className="py-2 px-4 text-left">Descuento</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon.id} className="border-b">
                  <td className="py-2 px-4">{coupon.code}</td>
                  <td className="py-2 px-4">{coupon.discount}%</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-colors mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron cupones.</p>
        )}
      </div>
    </div>
  );
};

export default CouponManagement;