const gates = require("./gates");
const truthTable = require("./truthTable");
const fs = require("fs");
const liveServer =  require('live-server');
let inputs = [];
let currentYValue = 1;
let outputString = "";

// expected to have one argument with the
// number of inputs for the gates
const arguments = process.argv.slice(2);
try {
  if (
    arguments.length < 2 ||
    isNaN(Number(arguments[0])) ||
    isNaN(Number(arguments[1])) ||
    Number(arguments[0] < 2)
  ) {
    console.log('Need 2 arguments, node generator #inputs #numCircuits')
    throw new Error("Need 2 arguments, node generator #inputs #numCircuits");
  }
} catch (err) {
  process.exit();
}

function createInitialInputs(value) {
  for (let i = 1; i <= value; i++) {
    inputs.push(createInput("x".repeat(i)));
    outputString += Number(inputs[i - 1].value);
  }
}

// values are all set to 1 to calculate the
// maximum value in the truthTable.js
// each input can be visisted only once unless
// it is picked twice for a given gate
function createInput(name) {
  return {
    name,
    numVisited: 0,
    value: 1
  };
}

// pick random gate from gate.js
function pickRandomGate() {
  return gates[Math.floor(Math.random() * gates.length)];
}

// pick random inputs to use for a given gate
function pickRandomInputs(gate) {
  const availableIndices = inputs
    .map((input, index) => {
      if (input.numVisited < 1) return index;
    })
    .filter(index => index !== undefined);

  const pickedInputs = [];
  const pickedIndices = [];

  // grab a random input for the available (not picked yet)
  for (let i = 0; i < gate.input; i++) {
    let randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    pickedIndices.push(randomIndex);
    pickedInputs.push(inputs[randomIndex]);
  }

  pickedIndices.forEach(index => {
    inputs[index].numVisited++;
  });

  return pickedInputs;
}

// check if there are more unvisisted inputs
// once we are down to a single unvisited input
// then that will be the final value of the circuit
function hasMoreInputs() {
  let numUnvisited = 0;
  inputs.forEach(input => {
    if (!input.numVisited) {
      numUnvisited++;
    }
  });
  return numUnvisited > 1;
}

function calculateGate(gate, pickedInputs) {
  let operation;

  if (gate.input === 1) {
    operation = `${gate.operator}${pickedInputs[0].value}`;
  } else {
    operation = `${pickedInputs[0].value}${gate.operator}${
      pickedInputs[1].value
    }`;
  }
  return eval(operation);
}

function addNewInput(value) {
  inputs.push({
    name: "y".repeat(currentYValue++),
    numVisited: 0,
    value
  });
}

function addGateToOutput(gate, pickedInputs) {
  if (pickedInputs.length === 1) {
    outputString += `${gate.symbol}${pickedInputs[0].name}`;
  } else {
    outputString += `${gate.symbol}${pickedInputs[0].name}#${
      pickedInputs[1].name
    }`;
  }
}

function deleteOldCircuitData() {
  fs.unlink("./expected0results.txt", err => {
    if (err) console.log("expected0results.txt does not exist yet");
  });

  fs.unlink("./expected1results.txt", err => {
    if (err) console.log("expected1results.txt does not exist yet");
  });

  fs.unlink("./allCircuits.txt", err => {
    if (err) console.log("allCircuits.txt does not exist yet");
  });

  fs.unlink("./circuitData.js", err => {
    if (err) console.log("circuitData.js does not exist yet");
  });
}

deleteOldCircuitData();

for (let i = 0; i < arguments[1]; i++) {
  inputs = [];
  currentYValue = 1;
  outputString = "";
  createInitialInputs(arguments[0]);
  while (hasMoreInputs()) {
    const gate = pickRandomGate();
    const pickedInputs = pickRandomInputs(gate);
    addGateToOutput(gate, pickedInputs);
    const newValue = calculateGate(gate, pickedInputs);
    addNewInput(newValue);
  }
  truthTable.calculateTruthtables(outputString);
}

truthTable.writeJS();
liveServer.start();