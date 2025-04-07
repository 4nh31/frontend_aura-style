import axios from "axios";
export const genericRequestConForm = async (url: string, method: string, formData: FormData, requireAuth: boolean = false) => {
    try {
      const headers: Record<string, string> = {};
  
      if (requireAuth) {
        const token = localStorage.getItem("token");
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }
  
      const response = await axios({
        url: `http://localhost:3000${url}`,
        method,
        headers,
        data: formData,
      });
  
      return response.data;
    } catch (error: any) {
      console.error(`Error en genericRequestConFormData: ${error.message}`, { url, method, formData, error });
      throw error;
    }
  };
  