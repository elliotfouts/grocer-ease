const mongoose = require("mongoose");
const db = require("../models");
const GrocerySeed = require('./GrocerySeed');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/grocer-ease"
);



db.Grocery.remove({})
  .then(() => db.Grocery.collection.insertMany(GrocerySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
