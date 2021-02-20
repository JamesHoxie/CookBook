import React from "react"; 
import Cookbook from './Cookbook';

function App() {
  function addRecipe() {
      recipes.push(
        {
          name: "new recipe",
          description: "this is a new recipe", 
          image: "peanut-butter-and-jelly.jpeg",
          ingredients: 
          [
            {name: "ingredient1", amount: "0", unit: "tbsp"},
            {name: "ingredient2", amount: "0", unit: "tbsp"}, 
            {name: "cooking oil", amount: "1", unit: "tbsp"}
          ]
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
      <Cookbook recipes={recipes} addRecipe={addRecipe}/>
    </div>
  );
}

export default App;