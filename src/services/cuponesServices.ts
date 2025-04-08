import { genericRequest } from "../utils/genericRequestUtils";
import { Coupon } from "../interfaces/Coupon";

export const getCupones = async () => {
  return await genericRequest("/cupones/", "GET", undefined, true);
};

export const createCupones = async (data: Omit<Coupon, 'idCupon'>) => {
  const response = await genericRequest('/cupones/', 'POST', data, true);
  return response;
}

export const deleteCupon = async (idCategoria: number) => {
  return await genericRequest(`/cupones/${idCategoria}`, 'DELETE', undefined, true);
};

export const updateCupon = async (idCategoria: number, data: Omit<Coupon, 'idCupon'>) => {
  return await genericRequest(`/cupones/${idCategoria}`, 'PUT', data, true);
};