import { genericRequest } from "../utils/genericRequestUtils";
import { ILogin } from "../interfaces/ILogin";
import { IRegister } from "../interfaces/IRegister";

export const login = async (data: ILogin) => {
  // Cambiar el endpoint a /auth/login
  const response = await genericRequest('/usuarios/login', 'POST', data);
  return response;
}

export const register = async (data: IRegister) => {
  const response = await genericRequest('/usuarios/', 'POST', data);
  return response;
}

export const getuser = async (idUsuario: number) => {
  return await genericRequest(`/usuarios/${idUsuario}`, 'GET', undefined, true);
};

export const deleteuser = async (idUsuario: number) => {
  return await genericRequest(`/usuarios/${idUsuario}`, 'DELETE', undefined, true);
};

// Función para actualizar la información del usuario
export const updateUser = async (idUsuario: number, data: Partial<IRegister>) => {
  return await genericRequest(`/usuarios/${idUsuario}`, 'PUT', data, true);
};

export const requestResetPassword = async (email: string) => {
  return await genericRequest("/auth/forgot-password", "POST", { email });
};

export const resetPassword = async (newPassword: string, token: string) => {
  return await genericRequest(`/auth/reset-password/${token}`, "POST", { newPassword });
};
