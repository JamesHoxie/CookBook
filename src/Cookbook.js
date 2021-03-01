import React, { useState, useEffect } from 'react';
import './CookBook.css';
import Page from './Page';

function Cookbook(props) {
  const recipes = props.recipes;
  const addRecipes = props.addRecipes;
  const units = props.units;
  const [visibleRecipes, setVisibleRecipes] = useState([0, 1]);  
  const [fullScreened, setFullScreened] = useState([false, false]);

    function toggleZoom(pageSide) {
      let newState = [];
      setFullScreened((prevState) => {
        if(pageSide === 'left') {
          newState = [!prevState[0], prevState[1]];
        } else { // pageSide === 'right'
          newState = [prevState[0], !prevState[1]];
        }

        return newState;
      });
    }

    function flipPageBackward() {
        if(fullScreened[0]) return; // no page flips allowed when in full screen

        setVisibleRecipes((prevVisibleRecipes) => {
          let leftPrev = prevVisibleRecipes[0];
          let leftNew = (leftPrev - 2) < 0 ? leftPrev : leftPrev - 2;
          let rightNew = leftNew + 1;
          
          return [leftNew, rightNew]; 
        });
    }

    function flipPageForward() { 
      if(fullScreened[1]) return; // no page flips allowed when in full screen

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
          
          {visibleRecipes[1] > recipes.length && 
            <div className="cookbook-pages">
              <p>Loading recipes... </p>
            </div>
          }

          {visibleRecipes[1] <= recipes.length && !fullScreened[0] && !fullScreened[1] && 
            <div className="cookbook-pages">
              <Page recipe={recipes[visibleRecipes[0]]} units={units} pageNumber={visibleRecipes[0]+1} flipPage={flipPageBackward} zoomIn={toggleZoom} />
              <Page recipe={recipes[visibleRecipes[1]]} side="right" units={units} pageNumber={visibleRecipes[1]+1} flipPage={flipPageForward} zoomIn={toggleZoom} />
            </div>
          }

          {fullScreened[0] &&
            <div className="zoomed-in-background">
              <div className="zoomed-in">
                <Page recipe={recipes[visibleRecipes[0]]} units={units} pageNumber={visibleRecipes[0]+1} flipPage={flipPageBackward} zoomIn={toggleZoom} />
              </div>
            </div>
          }

          {fullScreened[1] &&
            <div className="zoomed-in-background">
              <div className="zoomed-in">
                <Page recipe={recipes[visibleRecipes[1]]} side="right" units={units} pageNumber={visibleRecipes[1]+1} flipPage={flipPageForward} zoomIn={toggleZoom} />
              </div>
            </div>
          }
        </div>
      );
}

export default Cookbook;