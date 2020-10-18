import React, {useState} from 'react';
import './CookBook.css';
import Page from './Page';

function Cookbook({recipes}) {
  const [visibleRecipes, setVisibleRecipes] = useState([0, 1]);  

    function flipPageBackward() {
        setVisibleRecipes((prevVisibleRecipes) => {
          let leftPrev = prevVisibleRecipes[0];
          let leftNew = (leftPrev - 2) < 0 ? leftPrev : leftPrev - 2;
          let rightNew = leftNew + 1;
          
          return [leftNew, rightNew]; 
        })
    }

    function flipPageForward() {
      setVisibleRecipes((prevVisibleRecipes) => {
        let leftPrev = prevVisibleRecipes[0];
        let leftNew = (leftPrev + 2) >= recipes.length ? leftPrev : leftPrev + 2;
        let rightNew = leftNew + 1;
        
        return [leftNew, rightNew]; 
      })
    }
    
    return (
        <div className="cookbook">
          <h2>Panda's Cookbook</h2>
          
          <div className="cookbook-pages">
    <button className="flip-backward-button" onClick={flipPageBackward}>{"<-"}</button>
            <Page recipe={recipes[visibleRecipes[0]]}/>
            <Page recipe={recipes[visibleRecipes[1]]} side="right"/>
            <button className="flip-forward-button" onClick={flipPageForward}>{"->"}</button>
          </div>
        </div>
      );
}

export default Cookbook;