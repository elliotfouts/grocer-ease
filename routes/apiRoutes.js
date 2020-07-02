const router = require("express").Router();
const {
  Grocery: {addGrocery, getAllGroceries, getCurrentGroceries, getOneGrocery, getSearchedGroceries, updateGrocery, deleteGrocery}
} = require('../controllers'); 
const { response, request } = require("express");

// get routes
router.get('/groceries', async (request, response) => {
  try {
    const groceries = await getAllGroceries();

    if (groceries.length > 0) 
      response.json(groceries);
    else 
      response.status(404).json({error: 'Grocery Not Found', message: 'are you sure you have groceries?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: "Oops! Something went wrong; a team on ninjas is on it"});
  }
});
router.get('/groceries/current', async (request, response) => {
  try {
    const currentGroceries = await getCurrentGroceries();
    response.json(currentGroceries);
  } catch (error) {
    console.log(error);
    response.status(500).json({error: "Oops! Something went wrong; a team on ninjas is on it"});
  }
});
router.get('/groceries/:_id', async (request, response) => {
  try {
    const {_id} = request.params;
    const grocery = await getSearchedGroceries({_id})

    if (grocery) 
      response.json(grocery);
    else {
      response.status(404).json({error: 'Grocery not found', message: 'Are you sure that is the correct ID?'})
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
})
router.get('/groceries/search/:name', async (request, response) => {
  try {
    const {name} = request.params;
    const grocery = await getSearchedGroceries({ "name" : { $regex: new RegExp(`${name}`), $options: 'i' } })

    if (grocery) 
      response.json(grocery);
    else {
      response.status(404).json({error: 'Grocery not found', message: 'Are you sure that is the name of a grocery?'})
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
})

// post routes
router.post('/groceries', async (request, response) => {
  // expected grocery format: { name, category, imageUrl, quantity, notes, users[] }
  try {
    const {body: groceryInfo} = request;

    const newGrocery = await addGrocery(groceryInfo);

    if (newGrocery) 
      response.json(newGrocery);
    else 
      response.status(404).json({error: 'Could not add grocery', message: `Are you sure you're sending valid values?`});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
})


// put routes 


// delete routes
module.exports = router;
