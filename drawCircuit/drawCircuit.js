import Grid from "./Grid.js";

// Get references to document
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const displayGrid = document.querySelector("#show-grid");
const circuitSelector = document.querySelector("#circuit-selector");
const errorMessage = document.querySelector("#error-message");
const inputs = document.querySelector("#inputs");

// global variables for which circuit to draw
// and if should draw the grid
let currentCircuit = 0;
let shouldDrawGrid = false;
const GRID_COLOR = "#00FF00AA";

// Attach all the event listeners
displayGrid.addEventListener("change", e => {
  shouldDrawGrid = !shouldDrawGrid;
  if (inputs.value) {
    drawCircuit(inputs.value);
  }
});

circuitSelector.addEventListener("change", e => {
  currentCircuit = e.target.value;
  if (inputs.value) {
    drawCircuit(inputs.value);
  }
});

inputs.addEventListener("keyup", e => {
  const expectedInputLen = circuitData[currentCircuit].replace(/[^0-1]/g, "")
    .length;
  const inputValues = inputs.value;
  if (inputValues.match(/[^0-1]/g) || inputValues.length !== expectedInputLen) {
    errorMessage.innerHTML = `Expecting ${expectedInputLen}:  0's and 1's`;
  } else {
    errorMessage.innerHTML = "";
    drawCircuit(inputValues);
  }
});

// read in all the circuit data from the JS file created by the
// truthTable.js.  Create an option for every circuit.
readCircuitData();

function readCircuitData() {
  const fragment = document.createDocumentFragment();
  circuitData.forEach((circuit, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = circuit;
    fragment.appendChild(option);
  });
  circuitSelector.appendChild(fragment);
  const expectedInputLen = circuitData[currentCircuit].replace(/[^0-1]/g, "")
    .length;
  inputs.value = "0".repeat(expectedInputLen);
  drawCircuit(inputs.value);
}

function drawCircuit(inputs) {
  const circuit = parseGates(inputs);
  const grid = new Grid(circuit.inputs.length);
  addInputs(grid, circuit.inputs);
  addGates(grid, circuit.gates);

  // Find the longest row and number of inputs
  // to resize the canvas to fit all gates
  const circuitMax = sizeCanvas(grid);
  if (shouldDrawGrid) {
    drawGrid(grid, circuitMax, ctx);
  }
  grid.drawConnections(ctx);
  grid.draw(ctx);
}

function sizeCanvas(grid) {
  const maxWidth = grid.gates.reduce(
    (prevMax, row) => (row.length > prevMax ? row.length : prevMax),
    0
  );
  const maxHeight = grid.gates.length;
  canvas.width = grid.offset + maxWidth * 100 + 500;
  canvas.height = grid.offset + maxHeight * 100;
  return { col: maxHeight, row: maxWidth };
}

function addInputs(grid, inputs) {
  inputs.forEach(value => {
    grid.addInput(value);
  });
}

function addGates(grid, gates) {
  gates.forEach(gate => {
    grid.addGate(gate);
  });
  grid.addFinalState();
}

function parseGates(inputs) {
  const circuit = {};
  circuit.inputs = inputs.split("");
  circuit.gates = circuitData[currentCircuit]
    .replace(/[0-1]/g, "")
    .split(/(?=[NOA])/);
  return circuit;
}

function drawGrid(grid, { col, row }, ctx) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      ctx.beginPath();
      ctx.strokeStyle = GRID_COLOR;
      ctx.rect(grid.getX(i), grid.getY(j), 100, 100);
      ctx.stroke();
    }
  }

  grid.currentCol = 0;
  grid.currentRow = 0;
}
