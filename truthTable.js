const fs = require("fs");
const gates = require("./gates");
let currentYValue = 1;

function calculateTruthtables(input) {
  let currentValue = 0;
  const gateMap = createGateMap(gates);
  const numInputs = countInputs(input);
  const maxValue = parseInt("1".repeat(numInputs), 2);
  const expected0Values = [];
  const expected1Values = [];

  for (let i = 0; i <= maxValue; i++) {
    const values = createMapValues(currentValue, numInputs);
    const strippedInput = stripNumbers(input);
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

  outputResults(expected0Values, expected1Values);
  writeResults(expected0Values, expected1Values);
}

function createGateMap(gates) {
  const gateMap = new Map();
  gates.forEach(gate => gateMap.set(gate.symbol, gate.operator));
  return gateMap;
}

function countInputs(input) {
  return input.replace(/[^0-1]/g, "").length;
}

function stripNumbers(input) {
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

function createPaddedBinary(value, numInputs) {
  return value.toString(2).padStart(numInputs, 0);
}

function createMapValues(value, numInputs) {
  const binaryValues = createPaddedBinary(value, numInputs);
  const map = new Map();
  for (let i = 1; i <= numInputs; i++) {
    map.set("x".repeat(i), Boolean(Number(binaryValues[i - 1])));
  }
  return map;
}

function calculateValues({ values, tokens, gateMap }) {
  tokens.forEach(token => {
    if (token.operands.length === 1) {
      values.set(
        `${"y".repeat(currentYValue++)}`,
        eval(`${gateMap.get(token.operator)}${values.get(token.operands[0])}`)
      );
    } else {
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

function writeResults(expected0Values, expected1Values) {
  fs.writeFile("./expected0Results.txt", expected0Values.join("\n"), function(
    err
  ) {
    if (err) {
      return console.log("Error writting 0 expected file");
    }
    console.log("Successfully wrote expected0results.txt");
  });

  fs.writeFile("./expected1Results.txt", expected1Values.join("\n"), function(
    err
  ) {
    if (err) {
      return console.log("Error writting 1 expected file");
    }
    console.log("Successfully wrote expected1results.txt");
  });
}

module.exports = calculateTruthtables;
