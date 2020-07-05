import axios from "axios";

export const getGroceries = async () => {
  const {data} = await axios.get("/api/groceries");
  return data;
}

export const getCurrentGroceries = async () => {
  let groceries = await getGroceries();
  return groceries.filter((grocery) => grocery.isCurrent);
}

export const getGroceryById = async (id) => {
  const {data} = await axios.get(`/api/groceries/${id}`);
  return data[0];
}

export const updateGrocery = (id, grocery) => {
  return axios.put(`/api/groceries/${id}`, grocery);
}

export const createGrocery = (grocery) => {
  return axios.post('/api/groceries', grocery);
}

export const removeGrocery = (id) => {
  return axios.put(`/api/groceries/${id}/removecurrent`, {isCurrent: false, quantity: '', note: ''});
}