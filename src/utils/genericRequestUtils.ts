import axios from "axios";

export const genericRequest = async (url: string, method: string, body?: any, requireAuth: boolean = false) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Solo agregar el token si requireAuth es true
    if (requireAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await axios({
      url: `http://localhost:3000${url}`,
      method,
      headers,
      data: body,
    });

    return response.data;
  } catch (error: any) {
    console.error(`Error en genericRequest: ${error.message}`, { url, method, body, error });
    throw error;
  }
};