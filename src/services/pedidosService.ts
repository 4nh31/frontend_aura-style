import { genericRequest } from "../utils/genericRequestUtils";


export const getPedidos = async () => {
    return await genericRequest("/pedidos/", "GET", undefined,);
  };
  