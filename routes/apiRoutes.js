const router = require("express").Router();
const {
  Grocery: {addGrocery, getAllGroceries, getCurrentGroceries, getSearchedGroceries, updateGrocery, deleteGrocery}
} = require('../controllers'); 

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
});
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
});

// post routes
router.post('/groceries', async (request, response) => {
  // expected grocery format: { name, category, imageUrl, quantity, notes, users[] }
  try {
    const {body: groceryInfo} = request;

    const newGrocery = await addGrocery(groceryInfo);

    if (newGrocery) 
      response.json(newGrocery);
    else 
      response.status(404).json({error: 'Could not add grocery', message: `Are you sure your values are valid?`});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});

// put routes 
router.put('/groceries/:_id', async (request, response) => {
  try {
    const {body: updatedGroceryInfo, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: updatedGroceryInfo}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Grocery could not update', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/name', async (request, response) => {
  try {
    const {body: {name}, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: {name}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not update name', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/category', async (request, response) => {
  try {
    const {body: {category}, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: {category}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not update category', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/imageUrl', async (request, response) => {
  try {
    const {body: {imageUrl}, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: {imageUrl}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not update image URL', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/quantity', async (request, response) => {
  try {
    const {body: {quantity}, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: {quantity}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not update quantity', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/removecurrent', async (request, response) => {
  try {
    const {body: {isCurrent, quantity, note}, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: {isCurrent, quantity, note}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not update status', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/note', async (request, response) => {
  try {
    const {body: {note}, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: {note}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not update note', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/add-user', async (request, response) => {
  try {
    const {body: {newUser}, params: {_id}} = request;
    const updatedGrocery = await updateGrocery({push: {users: newUser}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not add user', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});
router.put('/groceries/:_id/remove-users', async (request, response) => {
  try {
    const {params: {_id}} = request;
    const updatedGrocery = await updateGrocery({set: {users: []}}, _id);

    if (updatedGrocery)
      response.json(updatedGrocery);
    else 
      response.status(400).json({error: 'Could not remove users', message: 'Are you sure your update query and ID are valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
});

// delete routes
router.delete('/groceries/:_id', async (request, response) => {
  try {
    const {params: {_id}} = request;
    const deletedGrocery = await deleteGrocery(_id);
    
    if (deletedGrocery)
      response.json(deletedGrocery);
    else 
      response.status(404).json({error: 'Could not delete grocery', message: 'Are you sure that ID is valid?'});
  } catch (error) {
    console.log(error);
    response.status(500).json({error: 'Oops! Something went wrong; a team on ninjas is on it'})
  }
})
module.exports = router;
