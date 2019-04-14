const gates = require("./gates");
let currentInput = "y";

const arguments = process.argv.slice(2);
if (
  arguments.length > 1 ||
  arguments.length === 0 ||
  isNaN(Number(arguments[0]))
) {
  throw new Error("Need 1 argument that represents the number of inputs");
  process.exit();
}

const numInputs = arguments[0];

// create map representing inputs
const inputs = [];
for (let i = 1; i <= numInputs; i++) {
  inputs.push(createInput("x".repeat(i)));
}

function createInput(name) {
  return {
    name,
    visited: false
  };
}

// pick random gate
function pickRandomGate() {
  return gates[Math.floor(Math.random() * (gates.length))];
}

// pick random inputs to use
function pickRandomInputs(gate) {
  const pickedInputs = [];
  for (let i = 0; i < gate.input; i++) {      
    pickedInputs.push(
      inputs[Math.floor(Math.random() * (numInputs.length))]
    );
  }
  return pickedInputs;
}

// check if has more unvisited inputs to use
function hasMoreInputs() {
  return inputs.some(input => !input.visisted);
}
// repeat until all inputs have been visited except for the output of last one
// output string created

const gate = pickRandomGate();
console.log(gate);
console.log(pickRandomInputs(gate))
