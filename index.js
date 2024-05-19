const fs = require("fs");
const inquirer = require("inquirer");
const colors = require("colors");
const path = require("path");
const { Rectangle, Circle, Triangle } = require("./shapes/shapes.js");

// Above are all of the moduels I will be using for this challenge.
// Above, I added the colors moduel to mark some inputs in the command line.
// Colors module is used for my personal use not application use.

const questions = [
  {
    type: "input",
    name: "fileName",
    message: "Please enter your file name:",
    validate: function (input) {
      if (!input.trim().includes(".svg") || input.trim() === "") {
        return "Please enter a svg file type ex. picture.svg !";
      }
      return true;
    },
  },
  // Above, is a question to ask and make sure the input is a svg file type.
  {
    type: "input",
    name: "text",
    message: "Please enter up to three charcters",
    validate: function (input) {
      if (input.trim().length > 3 || input.trim() === "") {
        return "Please enter up to three characters!";
      }
      return true;
    },
  },
  // The question above checks if the input has a length greater than three or if it is empty.
  // Either of this occasions will result in a error message.

  {
    type: "input",
    name: "textColor",
    message: "Please enter a color or hexadecimal number for text color:",
    validate: function (input) {
      if (input.trim() === "") {
        return "Please enter a color or hexadecimal number!";
      }

      const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
      const isColorName = /^[a-zA-Z]+$/;

      if (!hexRegex.test(input) && !isColorName.test(input)) {
        return "Please enter a valid hexadecimal color code!";
      }

      return true;
    },
  },

  // The question above asks the user to input a text color.
  // The questions checks for a empty string
  // Also the question checks if the input passes the hex color test and color name test.
  // hexRegex and isColorName are regular expression tests.

  {
    type: "list",
    name: "shape",
    message: "Please pick a shape:",
    choices: ["Circle", "Triangle", "Square"],
  },

  // Above, we ask the user to pick a shape out of our array.

  {
    type: "input",
    name: "shapeColor",
    message: "Please enter a color or hexadecimal number for the background:",
    validate: function (input) {
      if (input.trim() === "") {
        return "Please enter a color or hexadecimal number!";
      }

      const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
      const isColorName = /^[a-zA-Z]+$/;

      if (!hexRegex.test(input) && !isColorName.test(input)) {
        return "Please enter a valid hexadecimal color code!";
      }

      return true;
    },
  },

  // Above we ask for th shape color.
];

// Above, are the questions I will be using for inquirer

function writeToFile(fileName, data) {
  const folderPath = path.join(__dirname, "examples");
  // I create a file path that links to the examples directory and store it in a variable.

  const filePath = path.join(folderPath, fileName);
  // I join the file path with the file name and store it in a variable .

  fs.writeFile(filePath, data, (err) =>
    err ? console.error(err) : console.log("Success, your svg file is created!")
  );
}
// Above, I created a function to write a file and pass the file path and data into it.

function init() {
  inquirer
    .prompt(questions)
    .then((data) => {
      let shapeColor;
      let textColor;
      let shape;
      let fileName = data.fileName;
      // Above we declare three variables, three  of which we will  use for our switch statments.
      const upperDataText = data.text.replace(/[a-zA-Z]/g, (letter) =>
        letter.toUpperCase()
      );
      // Above, we make all letters in our text property uppercase.
      const isColorNameShape = /^[a-zA-Z]+$/.test(data.shapeColor);
      const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
      const isHexColorShape = hexRegex.test(data.shapeColor);
      const isColorNameText = /^[a-zA-Z]+$/.test(data.textColor);
      const isHexColorText = hexRegex.test(data.textColor);
      // Above, we assign regualar expressions to variables that will be used for our switch statments.

      switch (true) {
        case isColorNameText:
          textColor = data.textColor.replace(/[A-Z]/g, (letter) =>
            letter.toLowerCase()
          );

          break;
        case isHexColorText:
          textColor = data.textColor;

          break;
        default:
          textColor = "";
      }

      // Above is a switch statment for the text color being letters or hex#.

      switch (true) {
        case isColorNameShape:
          shapeColor = data.shapeColor.replace(/[A-Z]/g, (letter) =>
            letter.toLowerCase()
          );

          break;
        case isHexColorShape:
          shapeColor = data.shapeColor;

          break;
        default:
          shapeColor = "";
      }
      // Above, our second switch statment checks for our case of input for shapeColor.
      // If a color is entered using letters then that color will be made to lower case.
      // If a hex color is entered then we will use the hex color entered.

      switch (data.shape) {
        case "Circle":
          shape = "circle";
          break;
        case "Triangle":
          shape = "polygon";

          break;

        case "Square":
          shape = "rect";

          break;

        default:
          shape = " ";
      }

      //Above, our third switch statment checks for the input of shape we recieved.
      // Then the shape for a svg file is stored in the shape variable.

      return { fileName, shapeColor, shape, upperDataText, textColor };
      // Above, I return these values to use in the next .then.
    })
    .then((results) => {
      let newShapeObj;

      // Above I initalize a the variable newShapeObj.

      switch (results.shape) {
        case "circle":
          newShapeObj = new Circle(
            results.shapeColor,
            results.upperDataText,
            results.textColor
          );
          break;

        case "polygon":
          newShapeObj = new Triangle(
            results.shapeColor,
            results.upperDataText,
            results.textColor
          );
          break;

        case "rect":
          newShapeObj = new Rectangle(
            results.shapeColor,
            results.upperDataText,
            results.textColor
          );
          break;

        default:
          newShapeObj = " ";
      }

      console.log(newShapeObj);

      //Above, is a switch statment that creates a new shape object depending on the value of shape.

      writeToFile(results.fileName, newShapeObj.markUP());

      //Above, I use my write to file function and pass in the filename and newShapeObj function markUP.
    })

    .catch((err) => {
      console.error("Error writing to file:", err);
    });

  // Above, is the catch function to end the chain if .then's.
}

init();
