class Shape {
  constructor(color, text) {
    if (text.length > 3) {
      throw new Error("Invalid text length!");
    }

    this.text = text;
    this.color = color;
  }
};

class Rectangle extends Shape {
  constructor(color, text) {
    super(color, text);
  }
};

Rectangle.prototype.render = function () {
  return `
    
    <svg width="500" height="500" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="270" height="150" fill=${this.color} />

    <text x="145" y="85" text-anchor="middle" alignment-baseline="middle" font-family="Arial" font-size="97"
        fill="white">
        ${this.text}
    </text>

    </svg>
    
    `;
};

class Circle extends Shape {
  constructor(color, text) {
    super(color, text);
  }
};

Circle.prototype.render = function () {
  return `
    
    <svg width="500" height="500" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <circle cx="170" cy="170" r="150" fill=${this.color} />
  
      <text x="170" y="170" text-anchor="middle" alignment-baseline="middle" font-family="Arial" font-size="95" fill="white">
          ${this.text}
      </text>
  
  
  
    </svg>
    
    `;
};

class Triangle extends Shape {
  constructor(color, text) {
    super(color, text);
  }
};

Triangle.prototype.render = function () {
  return `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <polygon points="150,30 270,270 30,270" fill=${this.color}/>
  <text x="150" y="200" text-anchor="middle" font-family="Arial" font-size="45" fill="white">${this.text}</text>
    </svg>
   
    
    `;
};

const newShape = new Triangle("red", "TDV");

newShape.render();
