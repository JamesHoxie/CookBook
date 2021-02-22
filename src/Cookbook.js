import React, { useState, useEffect } from 'react';
import './CookBook.css';
import Page from './Page';

function Cookbook(props) {
  const recipes = props.recipes;
  const addRecipes = props.addRecipes;
  const units = props.units;
  const [visibleRecipes, setVisibleRecipes] = useState([0, 1]);  

    function flipPageBackward() {
        setVisibleRecipes((prevVisibleRecipes) => {
          let leftPrev = prevVisibleRecipes[0];
          let leftNew = (leftPrev - 2) < 0 ? leftPrev : leftPrev - 2;
          let rightNew = leftNew + 1;
          
          return [leftNew, rightNew]; 
        });
    }

    function flipPageForward() { 
      setVisibleRecipes((prevVisibleRecipes) => {
        let leftPrev = prevVisibleRecipes[0];
        let leftNew = leftPrev + 2;
        let rightNew = leftNew + 1;

        if(leftNew >= recipes.length) addRecipes(); // get 2 random recipes from spoonacular for new pages if going over current length

        return [leftNew, rightNew];
      });
    }
    
    return (
        <div className="cookbook">
          <h2>Panda's Cookbook</h2>
          
          {visibleRecipes[1] > recipes.length && 
            <div className="cookbook-pages">
              <button className="flip-backward-button" onClick={flipPageBackward}>{"<-"}</button>
              <p>Loading recipes... </p>
              <button className="flip-forward-button" onClick={flipPageForward}>{"->"}</button>
            </div>
          }

          {visibleRecipes[1] <= recipes.length && 
            <div className="cookbook-pages">
              <button className="flip-backward-button" onClick={flipPageBackward}>{"<-"}</button>
              <Page recipe={recipes[visibleRecipes[0]]} units={units} pageNumber={visibleRecipes[0]}/>
              <Page recipe={recipes[visibleRecipes[1]]} side="right" units={units} pageNumber={visibleRecipes[1]}/>
              <button className="flip-forward-button" onClick={flipPageForward}>{"->"}</button>
            </div>
          }
        </div>
      );
}

export default Cookbook;