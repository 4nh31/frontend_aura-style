import { genericRequest } from "../utils/genericRequestUtils";

export const getcategory = async () => {
  return await genericRequest("/categorias/", "GET", undefined);
};