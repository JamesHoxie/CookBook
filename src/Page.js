import React from 'react';
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

function Page({recipe, side = "left"}) {
    
    return (
        <div className={`page ${side}`}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <hr />
          {/* <img src={`../public/recipe-images/${recipe.image}`} alt={`${recipe.name}`}/> */}
          <img src={images[`${recipe.name.toLowerCase().replaceAll(' ', '-')}.jpg`]} alt={`${recipe.name}`} />
          <hr />
          <div className="ingredients">
            <ul>
              {recipe.ingredients.map((ingredient) => {
                return <li><strong>{ingredient.name}</strong>: {ingredient.measurement}</li>;
              })}
            </ul>
          </div>
        </div>
      );
}

export default Page;