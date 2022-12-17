import axios from "../../utils/axios.config";

export const fetchProducts = async () => {
  const data = await axios.get("/products");
  //   const data = await res.json();
  //   console.log(data);
  return data.data.data;
};
