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

    function toggle() {
      setIsOpened(wasOpened => !wasOpened);
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
                          
                          {!isOpened && 
                            ingredient.unit
                          } 
                          
                          {isOpened && 
                            <select className="convert-options">
                              <option>{ingredient.unit}</option>
                              {units.map((unit, index) => {
                                return <option key={index.toString()}>{`${unit}`}</option>   
                              })}
                            </select>
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