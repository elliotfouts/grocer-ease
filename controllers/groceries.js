const {Grocery} = require('../models');
const dropUndefined = require('../utils/dropUndefined');

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
    const {set: $set, unset: $unset, push: $push, pull: $pull, pullAll: $pullAll} = groceryInfo;
    const updateQuery = dropUndefined({$set, $unset, $push, $pull, $pullAll});

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