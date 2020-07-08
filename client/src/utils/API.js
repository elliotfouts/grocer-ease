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

export const getSuggestedGroceries = async (name) => {
  const {data} = await axios.get(`/api/groceries/search/${name}`);
  return data;
}

export const getSuggestedImages = async (brand, name, category) => {
  const {data} = await axios.get(`/api/groceries/suggestimages?brand=${brand}&name=${name}&category=${category}`);
  return data;
}

export const getDuplicate = async (name) => {
  let possibleDuplicates = await getSuggestedGroceries(name);
  let duplicate = false;
  
  possibleDuplicates.forEach(element => {
    if (element.name.toLowerCase() == name.toLowerCase()) {
      console.log('exact duplicate found: ' + element.name)
      duplicate = element;
    }
  });
  
  return duplicate;
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