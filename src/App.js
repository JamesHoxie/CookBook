import React from "react"; 
import Cookbook from './Cookbook';

function App() {
  // add this after import React: { useState, useEffect, componentWillMount } for the below code to work
  //const [renderedResponse, setRenderedResponse] = useState('');

  // TODO: may use this to make api calls to spoonacular for recipe conversions and other stuff
  // async function getResponse() {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // }

  // useEffect(() => {
  //   getResponse()
  //     .then(res => {
  //       const someData = res;
  //       setRenderedResponse(someData.express);
  //     });
  // }, []);

  // const recipes = ["Peanut Butter and Jelly Sandwich", "Grilled Cheese", "Spaghetti & Meatballs", "Crepes"];
  const recipes = [
                  {name: "Peanut Butter and Jelly Sandwich",
                   description: "2 slices of white bread with a delicious blend of peanut butter and jelly filling", 
                   image: "peanut-butter-and-jelly.jpeg",
                   ingredients: [
                                 {name: "white bread", measurement: "2 slices"},
                                 {name: "peanut butter", measurement: "2 tablespoons"}, 
                                 {name: "grape jelly", measurement: "2 teaspoons"}
                                ]
                  },
                  {name: "Grilled Cheese",
                   description: "2 slices of white bread with a delicious, melted cheddar cheese filling", 
                   image: "grilled-cheese.jpg",
                   ingredients: [
                                 {name: "white bread", measurement: "2 slices"},
                                 {name: "cheddar cheese", measurement: "2 slices"}, 
                                 {name: "butter", measurement: "3 tablespoons"}
                                ]
                  },
                  {name: "Spaghetti and Meatballs",
                   description: "spaghetti noodles and italian meatballs with a flavorful red sauce", 
                   image: "spaghetti-and-meatballs.jpg",
                   ingredients: [
                                 {name: "spaghetti", measurement: "1 lb"},
                                 {name: "ground beef", measurement: "1 lb"}, 
                                 {name: "bread crumbs", measurement: "1/3 cup"},
                                 {name: "parseley, finely chopped", measurement: "1/4 cup"},
                                 {name: "freshly grated parmesan cheese", measurement: "1/4 cup"}, 
                                 {name: "eggs", measurement: "1 unit"},
                                 {name: "garlic cloves, minced", measurement: "2 units"},
                                 {name: "salt", measurement: "to taste"}, 
                                 {name: "red pepper flakes", measurement: "1/2 teaspoon"},
                                 {name: "extra virgin olive oil", measurement: "2 tablespoons"},
                                 {name: "onion, finely chopped", measurement: "1/2 cup"}, 
                                 {name: "crushed tomatoes", measurement: "1 28oz can"},
                                 {name: "bay leaf", measurement: "1 unit"}, 
                                 {name: "freshley ground black pepper", measurement: "to taste"}
                                ]
                  },
                  {name: "Crepes",
                   description: "thin, soft french pancakes", 
                   image: "crepes.jpg",
                   ingredients: [
                                 {name: "all purpose flour", measurement: "1 cup"},
                                 {name: "eggs", measurement: "2 units"}, 
                                 {name: "milk", measurement: "1/2 cup"},
                                 {name: "water", measurement: "1/2 cup"},
                                 {name: "salt", measurement: "1/4 teaspoon"}, 
                                 {name: "melted butter", measurement: "2 tablesoons"}
                                ]
                  }
  ];

  return (
    <div>
      <Cookbook recipes={recipes}/>
    </div>
  );
}

export default App;