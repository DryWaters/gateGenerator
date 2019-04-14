const gates = require("./gates");
const truthTable = require("./truthTable");
const inputs = [];
let currentYValue = 1;
let outputString = "";

const arguments = process.argv.slice(2);
try {
  if (
    arguments.length > 1 ||
    arguments.length === 0 ||
    isNaN(Number(arguments[0]))
  ) {
    throw new Error("Need 1 argument that represents the number of inputs");
  }
} catch (err) {
  process.exit();
}

createInitialInputs(arguments[0]);

function createInitialInputs(value) {
  for (let i = 1; i <= value; i++) {
    inputs.push(createInput("x".repeat(i)));
    outputString += Number(inputs[i - 1].value);
  }
}

function createInput(name) {
  return {
    name,
    numVisited: 0,
    value: 1
  };
}

// pick random gate
function pickRandomGate() {
  return gates[Math.floor(Math.random() * gates.length)];
}

// pick random inputs to use
function pickRandomInputs(gate) {
  const availableIndices = inputs
    .map((input, index) => {
      if (input.numVisited < 1) return index;
    })
    .filter(index => index !== undefined);

  const pickedInputs = [];
  const pickedIndices = [];
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

// check if has more unvisited inputs to use
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

while (hasMoreInputs()) {
  const gate = pickRandomGate();
  const pickedInputs = pickRandomInputs(gate);
  addGateToOutput(gate, pickedInputs);
  const newValue = calculateGate(gate, pickedInputs);
  addNewInput(newValue);
}

truthTable(outputString);
