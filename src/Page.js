import React, { useState, useEffect } from 'react';
import './Page.css';

// import all images of recipes for Pages to use to display their respective recipes
// format for saved images atm must be .jpg and must use kebab case
// recipe names should be saved with normal spaces between words, all spaces will be converted to dashes
// when getting the image to display for the recipe
function importAll(r) {
  let images = {};
  r.keys().forEach(item => {
    images[item.replace('./', '')] = r(item);
  });
  
  return images;
}

const images = importAll(require.context('./recipe-images', false, /\.(png|jpe?g|svg)$/));

// set of all ingredient amounts for displaying in conversion selection drop down
const units = ["tsp", "tbsp", "cups", "L", "mL", "kg", "g", "mg"];

function Page(props) {
    const {recipe, side = "left"} = props;
    const [recipeMeasurements, setRecipeMeasurements] = useState(recipe);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
      setRecipeMeasurements(props);
    }, [props]);

    // close and open conversion buttons below ingredients
    function toggle() {
      setIsOpened(wasOpened => !wasOpened);
    }

    // convert selected ingredients 
    const convert = (event) => {
      
      let ingredientAmount = null;

      // IMPORTANT NOTE:
      // this line will not work if the ingredient li structure is modified
      const liElement = event.target.parentElement.parentElement; 
      // selecting parent of parent of clicked button in li to access the span element with the ingredient amount
      
      liElement.childNodes.forEach(element => {
        if(element.className === 'ingredient-amount') {
          let ingredientAmountParts = element.textContent.split('/'); // some amounts are in fractions, split and divide to get number

          if(ingredientAmountParts.length === 2) {
            ingredientAmount = parseInt(ingredientAmountParts[0]) / parseInt(ingredientAmountParts[1]);
          } else {
            ingredientAmount = parseInt(element.textContent);
          }
          
        }
      });
      
      console.log(ingredientAmount);

      // IMPORTANT NOTE:
      // this line will also not work if the ingredient li structure is modified
      const divElement = event.target.parentElement;
      // selecting parent of clicked button in li to access the select elements to get the ingredient units

      const selectFrom = divElement.firstChild;
      const convertFrom = selectFrom.options[selectFrom.selectedIndex].text;

      const selectTo = divElement.lastChild;
      const convertTo = selectTo.options[selectTo.selectedIndex].text;
        
      console.log(convertFrom,convertTo);

      // TODO: api fetch call to spoonacular to convert amounts
    }
    
    return (
        <div className={`page ${side}`}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <hr />
          <img src={images[`${recipe.name.toLowerCase().replaceAll(' ', '-')}.jpg`]} alt={`${recipe.name}`} />
          <hr />
          <div className="ingredients">
            <ul>
              {recipe.ingredients.map((ingredient, index) => {
                return <li key={index.toString()} className="ingredient">
                          <strong>{ingredient.name}</strong>: <span className="ingredient-amount">{ingredient.amount + " "}</span>
                        
                          {/* {(!isOpened || (isOpened && (ingredient.unit === 'slices' || ingredient.unit === ''))) && 
                            <span>{ingredient.unit}</span>
                          } */}

                          <span>{ingredient.unit}</span>
                          
                          {isOpened && ingredient.unit !== 'slices' && ingredient.unit !== '' &&
                            <div>
                              <select className="convert-from-options">
                                {ingredient.unit !== 'slices' && ingredient.unit !== '' && 
                                  units.map((unit, index) => {
                                    return <option key={index.toString()}>{`${unit}`}</option>   
                              })}
                              </select>
                              
                              <button className="convert-button" onClick={convert}>Convert to</button>
                              
                              <select className="convert-to-options">
                                {ingredient.unit !== 'slices' && ingredient.unit !== '' && 
                                  units.map((unit, index) => {
                                    return <option key={index.toString()}>{`${unit}`}</option>   
                                })}
                              </select>
                            </div>
                          }
                       </li>
              })}
            </ul>
            <button className="convert-button" onClick={toggle}>Convert ingredient units</button>
            
          </div>
        </div>
      );
}

export default Page;