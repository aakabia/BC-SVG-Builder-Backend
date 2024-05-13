class Shape {
  constructor(color, text) {
    if (text.length > 3) {
      throw new Error("Invalid text length!");
    }

    this.text = text;
    this.color = color;
  }
};
// Above, I create a parent class constructor named shape
// This constructor takes in color and text and checks if the text length is greater than 3.

class Rectangle extends Shape {
  constructor(color, text) {
    super(color, text);
  }
};

// Above, I create a child class constructor for rectangle shapes.
// This constructor inherits the properties of Shape.
// The same is repeated for the folowing shapes.

Rectangle.prototype.markUP = function () {


  return `
  <svg width="500" height="500" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="270" height="150" fill="${this.color}" />
    <text x="145" y="85" text-anchor="middle" alignment-baseline="middle" font-family="Arial" font-size="97"
        fill="white">
        ${this.text}
    </text>

  </svg>
    
    `;
};

Rectangle.prototype.render = function () {
    return `<rect x="10" y="10" width="270" height="150" fill="${this.color}"/>`
};

//Above, I a add two functions called render and markup.
// The markup function returns the markup for a svg file.
// The render function returns a svg shape that I will use to test.
// The same is repeated for the folowing shapes.

class Circle extends Shape {
  constructor(color, text) {
    super(color, text);
  }
}

Circle.prototype.markUP = function () {

  

  return `
    
    <svg width="500" height="500" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="170" cy="170" r="150" fill="${this.color}" />
      <text x="170" y="170" text-anchor="middle" alignment-baseline="middle" font-family="Arial" font-size="95" fill="white">
        ${this.text}
      </text>
    </svg>
    
    `;
};

Circle.prototype.render = function () {
    return `<circle cx="170" cy="170" r="150" fill="${this.color}"/>`
};


class Triangle extends Shape {
  constructor(color, text) {
    super(color, text);
  }
};

Triangle.prototype.markUP = function () {


  return `
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <polygon points="150,30 270,270 30,270" fill="${this.color}"/>
    <text x="150" y="200" text-anchor="middle" font-family="Arial" font-size="45" fill="white">${this.text}</text>
  </svg>
   
    
    `;
};

Triangle.prototype.render= function () {
    return `<polygon points="150,30 270,270 30,270" fill="${this.color}"/>`
};



module.exports = { Rectangle, Circle, Triangle };

// Above, I export all the classes in a object. 
