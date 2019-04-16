const fs = require("fs");
const gates = require("./gates");
let currentYValue = 1;

// go through every possible value for a given
// gate string
function calculateTruthtables(input) {
  let currentValue = 0;
  const gateMap = createGateMap(gates);
  const numInputs = countNumInputs(input);

  // Find the maximum int value by parsing a binary
  // representation of the largest possible input length
  const maxValue = parseInt("1".repeat(numInputs), 2);
  const expected0Values = [];
  const expected1Values = [];

  for (let i = 0; i <= maxValue; i++) {
    const values = createMapValues(currentValue, numInputs);
    const strippedInput = stripLeadingInputValues(input);
    const parsedInput = parseInput(strippedInput);
    const tokens = createTokens(parsedInput);
    calculateValues({ values, tokens, gateMap });
    if (values.get("y".repeat(currentYValue - 1)) === false) {
      expected0Values.push(
        `${createPaddedBinary(currentValue, numInputs)}${strippedInput}`
      );
    } else {
      expected1Values.push(
        `${createPaddedBinary(currentValue, numInputs)}${strippedInput}`
      );
    }
    currentYValue = 1;
    currentValue++;
  }

  // Uncomment if you want to see the output to the terminal
  // outputResults(expected0Values, expected1Values);
  writeResults(expected0Values, expected1Values, input);
}

// create a map to lookup the operator given the symbol
// of the gate from the external gates.js file
function createGateMap(gates) {
  const gateMap = new Map();
  gates.forEach(gate => gateMap.set(gate.symbol, gate.operator));
  return gateMap;
}

function countNumInputs(input) {
  return input.replace(/[^0-1]/g, "").length;
}

// create a map of the intial values for a given
// x => binaryRepresentation of a given integer value[index]
// example
// x => '1
// xx => '0'
// xxx => '1'
function createMapValues(value, numInputs) {
  const binaryValues = createPaddedBinary(value, numInputs);
  const map = new Map();
  for (let i = 1; i <= numInputs; i++) {
    map.set("x".repeat(i), Boolean(Number(binaryValues[i - 1])));
  }
  return map;
}

function createPaddedBinary(value, numInputs) {
  return value.toString(2).padStart(numInputs, 0);
}

function stripLeadingInputValues(input) {
  return input.replace(/[0-1]/g, "");
}

function parseInput(input) {
  return input.split(/(?=[NOA])/);
}

function createTokens(tokens) {
  return tokens.map(token => ({
    operator: token[0],
    operands: token.slice(1).split(/\#/)
  }));
}

// evalutate the tokens and store the y values into the values map
function calculateValues({ values, tokens, gateMap }) {
  tokens.forEach(token => {

    // NOT gate = 1 operands
    if (token.operands.length === 1) {
      values.set(
        `${"y".repeat(currentYValue++)}`,
        eval(`${gateMap.get(token.operator)}${values.get(token.operands[0])}`)
      );
    } else {
      // Must be AND/OR gate != 1 operands
      values.set(
        `${"y".repeat(currentYValue++)}`,
        eval(
          `${values.get(token.operands[0])}${gateMap.get(
            token.operator
          )}${values.get(token.operands[1])}`
        )
      );
    }
  });
}

function outputResults(expected0Values, expected1Values) {
  console.log("Expected 0 values include");
  console.log(expected0Values.join("\n"));
  console.log("\n");
  console.log("Expected 1 values include");
  console.log(expected1Values.join("\n"));
}

function writeResults(expected0Values, expected1Values, input) {
  try {
    fs.writeFileSync(
      "./expected0Results.txt",
      expected0Values.join("\n") + "\n",
      {
        flag: "a"
      }
    );
    fs.writeFileSync(
      "./expected1Results.txt",
      expected1Values.join("\n") + "\n",
      {
        flag: "a"
      }
    );
    fs.writeFileSync("./allCircuits.txt", input + "\n", {
      flag: "a"
    });
  } catch (err) {
    console.log("Unable to write file");
  }
}

// Called by generator when all circuits have been built
function writeJS() {
  try {
    const savedCircuits = fs.readFileSync("./allCircuits.txt", "utf-8");
    const parsedCircuits = savedCircuits.split("\n");
    parsedCircuits.pop(); // remove empty string at end
    const circuitData = `circuitData = ` + JSON.stringify(parsedCircuits);
    fs.writeFileSync("./circuitData.js", circuitData);
  } catch (err) {
    console.log("Unable to write JS file " + err);
  }
}

module.exports = {
  calculateTruthtables,
  writeJS
};
