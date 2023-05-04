const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    let firstRecipe = {
      title: "my Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      cuisine: "Asian",
    };
    await Recipe.create(firstRecipe);

    let myFirstRecipe = await Recipe.find({
      title: `Asian Glazed Chicken Thighs`,
    });
    console.log(myFirstRecipe);

    let manyRecipes = await Recipe.insertMany(data);
    for (let i = 0; i < manyRecipes.length; i++) {
      console.log(manyRecipes[i].title);
    }

    let oldPastaTime = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Success! New pasta time.");

    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("YAY, no more Carrot Cake!");

    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();
