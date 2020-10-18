import React from 'react';

function Hello() {
    function sayHello() {
        alert('hello');
      }
    
    return (
        <div className="hello">
          <h3>This is the hello component</h3>
          <button className="hello-button" onClick={sayHello}>Hello</button>
        </div>
      );
}

export default Hello;