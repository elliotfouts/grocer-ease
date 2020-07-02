const {Grocery} = require('../models');

// create methods
const addGrocery = async (grocery) => {
  try {
    let newGrocery = await Grocery.create(grocery);
    return newGrocery;
  } catch (err) {
    console.log(err)
  }
}

// read methods
const getAllGroceries = async () => {
  try {
    const groceries = await Grocery.find({});
    return groceries;
  } catch (err) {
    console.log(err)
  }
}
const getCurrentGroceries = async () => {
  try {
    const currentGroceries = await Grocery.find({isCurrent: true});
    return currentGroceries;
  } catch (error) {
    console.log(error)
  }
}
const getSearchedGroceries = async (query) => {
  try {
    const grocery = await Grocery.find(query);
    return grocery;
  } catch (err) {
    console.log(err);
  }
}

// update methods 
const updateGrocery = async (groceryInfo, groceryId) => {
  try {
    groceryInfo.set.size = groceryInfo.random;
    const {set: $set, unset: $unset, push: $push, $pull} = groceryInfo;
    const updateQuery = dropUndefined({$set, $unset, $push, $pull});

    const updatedGrocery = await Grocery.findByIdAndUpdate(groceryId, updateQuery, {new: true});
    return updatedGrocery;
  } catch (err) {
    console.log(err);
  }
}

// delete methods
const deleteGrocery = async (groceryId) => {
  try {
    const deletedGrocery = await Grocery.findByIdAndDelete(groceryId);

    return deletedGrocery;
  } catch (err) {

  }
}

module.exports = {
  addGrocery, 
  getAllGroceries,
  getCurrentGroceries,
  getSearchedGroceries,
  updateGrocery,
  deleteGrocery,
}