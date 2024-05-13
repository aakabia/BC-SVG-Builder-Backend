const { Rectangle, Circle, Triangle } = require("./shapes.js");

// Above, I imported the classes from shapes.js.



describe("Rectangle", () => {
  
  describe("render", () => {
    it("should return svg markup with user info", () => {
      const shape = new Rectangle("red", "TDV");
        const shapeMarkup = `<rect x="10" y="10" width="270" height="150" fill="red"/>`
      expect(shape.render()).toMatch(shapeMarkup);
    });
  });
});
// Above is a test for the render function within the rectangle class.
// Next, I use the class to create a new shape and create shape markup.
// Last, I test if my shape.render function returns me the same markup.
// The same is repeated for the classes Circle and Triangle below.

describe("Circle", () => {
  
    describe("render", () => {
      it("should return svg markup with user info", () => {
        const shape = new Circle("blue", "TDV");
        const shapeMarkup = `<circle cx="170" cy="170" r="150" fill="blue"/>`
        expect(shape.render()).toMatch(shapeMarkup);
      });
    });
});


describe("Triangle", () => {
  
    describe("render", () => {
      it("should return svg markup with user info", () => {
        const shape = new Triangle("yellow", "TDV");
        const shapeMarkup = `<polygon points="150,30 270,270 30,270" fill="yellow"/>`
        expect(shape.render()).toMatch(shapeMarkup);
      });
    });
});

// Note: must install jest as a dev dependency in order to test files.
// Also, file name should have .test.js