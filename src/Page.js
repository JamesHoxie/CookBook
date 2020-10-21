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
    const convert = e => {
      // const id = e.target.id;
      // NOTE: passing the target (button) is no longer necessary but i am leaving it for now for educational purposes as i learn react

      const selectFrom = document.querySelector('#convert-from-options');
      const convertFrom = selectFrom.options[selectFrom.selectedIndex].text;

      const selectTo = document.querySelector('#convert-to-options');
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
                return <li key={index.toString()}className="ingredient">
                          <strong>{ingredient.name}</strong>: {ingredient.amount + " "} 
                        
                          {/* {(!isOpened || (isOpened && (ingredient.unit === 'slices' || ingredient.unit === ''))) && 
                            <span>{ingredient.unit}</span>
                          } */}

                          <span>{ingredient.unit}</span>
                          
                          {isOpened && ingredient.unit !== 'slices' && ingredient.unit !== '' &&
                            <div>
                              <select id="convert-from-options">
                                {ingredient.unit !== 'slices' && ingredient.unit !== '' && 
                                  units.map((unit, index) => {
                                    return <option key={index.toString()}>{`${unit}`}</option>   
                              })}
                              </select>
                              
                              <button id="panda" onClick={convert}>Convert to</button>
                              
                              <select id="convert-to-options">
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