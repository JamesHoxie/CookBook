import React from "react"; 
import Cookbook from './Cookbook';

function App() {
  // extract ingredients from individual recipe data object ingredients list
  function processIngredients(recipeDataObjectIngredientsList) {
    return recipeDataObjectIngredientsList.map(ingredientDataObject => {
      const ingredient = {};

      ingredient.name = ingredientDataObject.originalName;
      ingredient.amount = ingredientDataObject.amount;
      ingredient.unit = ingredientDataObject.unit;

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
      // let newRecipes = [{name: 'a', description: '1', image: '', ingredients: []}, {name: 'a', description: '1', image: '', ingredients: []}];
      recipes.push(...newRecipes);
    })
    .catch(err => {
      console.log('error while fetching new recipes: ', err);
    });
  }

  const recipes = [
                  {name: "Peanut Butter and Jelly Sandwich",
                   description: "2 slices of white bread with a delicious blend of peanut butter and jelly filling", 
                   image: "peanut-butter-and-jelly.jpeg",
                   ingredients: [
                                 {name: "white bread", amount: "2", unit: "slices"},
                                 {name: "peanut butter", amount: "2", unit: "tbsp"}, 
                                 {name: "grape jelly", amount: "2", unit: "tbsp"}
                                ]
                  },
                  {name: "Grilled Cheese",
                   description: "2 slices of white bread with a delicious, melted cheddar cheese filling", 
                   image: "grilled-cheese.jpg",
                   ingredients: [
                                 {name: "white bread", amount: "2", unit: "slices"},
                                 {name: "cheddar cheese", amount: "2", unit: "slices"}, 
                                 {name: "butter", amount: "3", unit: "tbsp"}
                                ]
                  },
                  {name: "Spaghetti and Meatballs",
                   description: "spaghetti noodles and italian meatballs with a flavorful red sauce", 
                   image: "spaghetti-and-meatballs.jpg",
                   ingredients: [
                                 {name: "spaghetti", amount: "1", unit: "lb"},
                                 {name: "ground beef", amount: "1", unit: "lb"}, 
                                 {name: "bread crumbs", amount: "1/3", unit: "cups"},
                                 {name: "parseley, finely chopped", amount: "1/4", unit: "cups"},
                                 {name: "freshly grated parmesan cheese", amount: "1/4", unit: "cups"}, 
                                 {name: "eggs", amount: "1", unit: ""},
                                 {name: "garlic cloves, minced", amount: "2", unit: ""},
                                 {name: "salt", amount: "to taste", unit: ""}, 
                                 {name: "red pepper flakes", amount: "1/2", unit: "tsp"},
                                 {name: "extra virgin olive oil", amount: "2", unit: "tbsp"},
                                 {name: "onion, finely chopped", amount: "1/2", unit: "cups"}, 
                                 {name: "crushed tomatoes", amount: "28", unit: "oz"},
                                 {name: "bay leaf", amount: "1", unit: ""}, 
                                 {name: "freshley ground black pepper", amount: "to taste", unit: ""}
                                ]
                  },
                  {name: "Crepes",
                   description: "thin, soft french pancakes", 
                   image: "crepes.jpg",
                   ingredients: [
                                 {name: "all purpose flour", amount: "1", unit: "cups"},
                                 {name: "eggs", amount: "2", unit: ""}, 
                                 {name: "milk", amount: "1/2", unit: "cups"},
                                 {name: "water", amount: "1/2", unit: "cups"},
                                 {name: "salt", amount: "1/4", unit: "tsp"}, 
                                 {name: "melted butter", amount: "2", unit: "tbsp"}
                                ]
                  }
  ];

  return (
    <div>
      <Cookbook recipes={recipes} addRecipes={addRecipes}/>
    </div>
  );
}

export default App;