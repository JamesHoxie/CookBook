import React, { useState, useEffect } from 'react';
import './Page.css';

function Page(props) {
    const {recipe, side = "left", units, pageNumber} = props;
    const [recipeMeasurements, setRecipeMeasurements] = useState(recipe.ingredients);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
      // this runs everytime the recipe prop changes (second arg to the useEffect hook), we call setRecipeMeasurements to change the state
      // we only maintain state based on measurements, since conversions cannot change the name or image of a recipe
      // so we need to update internal page state to now reflect new measurements from the new recipe prop being passed on page flip
      // NOTE: this means that conversions done on a page are lost upon page flips, this is going to be intended behavior for now
      setRecipeMeasurements(oldMeasurements => recipe.ingredients);
    }, [recipe]);

    // close and open conversion buttons below ingredients
    function toggle() {
      setIsOpened(wasOpened => !wasOpened);
    }

    // change recipe measurements state when doing conversions
    function updateRecipeMeasurements(ingredientType, convertedAmount, newUnits) {
      toggle();
      setRecipeMeasurements(oldMeasurements => {
        const newMeasurements = JSON.parse(JSON.stringify(oldMeasurements)); // create deep copy of old measurements object

        for(let ingredient of newMeasurements) {
          if(ingredient.name === ingredientType) {
            ingredient.amount = convertedAmount;
            ingredient.unit = newUnits;
            break;
          }
        }

        return newMeasurements;
      });
    }

    // convert selected ingredients 
    const convert = async (event) => {
      let ingredientAmount = null;
      let ingredientType = null;

      // IMPORTANT NOTE:
      // this line will not work if the ingredient li structure is modified
      const liElement = event.target.parentElement.parentElement; 
      // selecting parent of parent of clicked button in li to access the span element with the ingredient amount
      
      ingredientType = liElement.firstChild.textContent;

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

      // IMPORTANT NOTE:
      // this line will also not work if the ingredient li structure is modified
      const divElement = event.target.parentElement;
      // selecting parent of clicked button in li to access the select elements to get the ingredient units

      const selectFrom = divElement.firstChild;
      const convertFrom = selectFrom.options[selectFrom.selectedIndex].text;

      const selectTo = divElement.lastChild;
      const convertTo = selectTo.options[selectTo.selectedIndex].text;
        
      console.log(ingredientType, ingredientAmount, convertFrom, convertTo);

      //api fetch call to spoonacular to convert amounts
      const convertedAmount = await callSpoonacular(ingredientType, ingredientAmount, convertFrom, convertTo);

      updateRecipeMeasurements(ingredientType, convertedAmount, convertTo);
    }

    // perform fetch call to spoonacular api to convert ingredient amounts
    function callSpoonacular(ingredientName, sourceAmount, sourceUnit, targetUnit) {
      const params = {
        'ingredientName': ingredientName,
        'sourceAmount': sourceAmount,
        'sourceUnit': sourceUnit,
        'targetUnit': targetUnit,
        'apiKey': '397e85a7d385419d8e083635fe5a78f3'
      };

      const url = new URL('https://api.spoonacular.com/recipes/convert');

      // set query strings on request
      url.search = new URLSearchParams(params).toString();
      
      return fetch(url)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log('success!\n', data.targetAmount);
        return data.targetAmount;
      })
      .catch(err => {
        console.log('something went wrong converting the ingredients\n', err);
      }); 
    }
    
    return (
        <div className={`page ${side}`}>
          <h5>{pageNumber}</h5>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <hr />
          <img src={recipe.image} alt={`${recipe.name}`} />
          <hr />
          <div className="ingredients">
            <ul>
              {recipeMeasurements.map((ingredient, index) => {
                return <li key={index.toString()} className="ingredient">
                          <strong>{ingredient.name}</strong>: <span className="ingredient-amount">{ingredient.amount + " "}</span>

                          <span className="ingredient-unit">{ingredient.unit}</span>
                          
                          {isOpened && units.includes(ingredient.unit) &&
                            <div>
                              <select className="convert-from-options" defaultValue={ingredient.unit}>
                                {ingredient.unit !== 'slices' && ingredient.unit !== '' && 
                                  units.map((unit, index) => {
                                    return <option key={index.toString()} value={unit}>{`${unit}`}</option>      
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