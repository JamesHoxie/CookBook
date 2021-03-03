import React, { useState, useEffect } from "react"; 
import Cookbook from './Cookbook';

function App() {
  useEffect(() => {
    // make one call to spoonacular to add 2 recipes on inital app load, useEffect runs once with empty dependency array
    addRecipes();
  }, [])

  // set recipes array as state, re render cookbook whenever the recipes are added to (after api call)
  // init the state to an empty cookbook
  const [recipes, setRecipes] = useState([]);

  // set of all ingredient amounts for displaying in conversion selection drop down and their alternative abreviations
  const units = {"tsp": ["teaspoon", "teaspoons", "t", "ts", "tspn", "tsps"],
                 "tbsp": ["tablespoon", "tablespoons", "t", "tb", "tbl", "tbs", "tbsp"],
                 "cups": ["cup", "c"],
                 "L": ["liter", "liters", "l"],
                 "mL": ["milliliter", "milliliters", "ml"],
                 "kg": ["kilogram", "kilograms"],
                 "g": ["gram", "grams", "gr"],
                 "oz": ["ounce", "ounces"],
                 "lb": ["pound", "pounds", "lbs"],
                 "pt": ["pint", "pints", "pts"],
                 "gal": ["gallon", "gallons", "gals"],
                 "qt": ["quart", "quarts", "qts"]
  }
  
  // convert other spellings/abreviations of units to type recognized for display
  function processUnit(unitToProcess) {
    unitToProcess = unitToProcess.toLowerCase();

    for(let unit in units) {
      if(units[unit].includes(unitToProcess)) {
        return unit; // return abreviation used by this program
      }
    }

    return unitToProcess; // return original unit to be processed, unit is atypical and cannot be converted by this program
  }

  // extract ingredients from individual recipe data object ingredients list
  function processIngredients(recipeDataObjectIngredientsList) {
    return recipeDataObjectIngredientsList.map(ingredientDataObject => {
      const ingredient = {};

      ingredient.name = ingredientDataObject.originalName;
      ingredient.amount = ingredientDataObject.amount;
      ingredient.unit = processUnit(ingredientDataObject.unit);

      return ingredient;
    });
  }

  // extract recipes from recipe data list returned from spoonacular
  function processData(recipeData) {
    return recipeData.recipes.map(recipeDataObject => {
      const recipe = {};

      recipe.name = recipeDataObject.title; // set name of dish in recipe
      recipe.description = recipeDataObject.summary.replace(/<\/?[^>]+(>|$)/g, "");; // set description of dish in recipe (currently using regex to strip out html tags, TODO: do this better without regex please)
      recipe.image = recipeDataObject.image; // set image of dish in recipe
      recipe.ingredients = processIngredients(recipeDataObject.extendedIngredients); // set ingredients of dish in recipe
      
      recipe.instructions = recipeDataObject.analyzedInstructions; // object mapping numbers as keys to subPart objects with a name and steps properties

      return recipe;
    });
  }

  // perform api call to spoonacular to fetch 2 new recipes for display when flipping pages past limits of current recipe list
  const getNewRecipes = () => {
    console.log(recipes.length);

    const params = {
      'limitLicense': true,
      'number': 2,
      'apiKey': '397e85a7d385419d8e083635fe5a78f3'
    };

    const url = new URL('https://api.spoonacular.com/recipes/random');

    // set query strings on request
    url.search = new URLSearchParams(params).toString();
    
    return fetch(url)
  }

  function addRecipes() {
    getNewRecipes()
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      const newRecipes = processData(data); // extract new recipe data into array of new recipe objects to return
      setRecipes(currRecipes => {
        currRecipes.push(...newRecipes);
        return JSON.parse(JSON.stringify(currRecipes)); // return new handle to recipes to notify react that the recipes have changed
      });
    })
    .catch(err => {
      console.log('error while fetching new recipes: ', err);
    });
  }

  return (
    <div>
      <Cookbook recipes={recipes} addRecipes={addRecipes} units={Object.keys(units)}/>
    </div>
  );
}

export default App;