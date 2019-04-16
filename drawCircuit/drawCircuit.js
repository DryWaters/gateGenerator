import Grid from "./Grid.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const displayGrid = document.querySelector("#show-grid");
let currentCircuit = 1;

displayGrid.addEventListener("change", e => drawCircuit(e.target.checked));

readCircuitData();

drawCircuit();

function readCircuitData() {
  console.log(circuitData.length);
}

function selectCircuit() {}

function drawCircuit(gridOn) {
  const circuit = parseGates();
  const grid = new Grid(circuit.inputs.length);
  addInputs(grid, circuit.inputs);
  addGates(grid, circuit.gates);
  const circuitMax = sizeCanvas(grid);
  if (gridOn) {
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

function parseGates() {
  const circuit = {};
  circuit.inputs = circuitData[currentCircuit].replace(/[^0-1]/g, "").split("");
  circuit.gates = circuitData[currentCircuit].replace(/[0-1]/g, "").split(/(?=[NOA])/);
  return circuit;
}

function drawGrid(grid, { col, row }, ctx) {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      ctx.beginPath();
      ctx.strokeStyle = "#00FF00AA";
      ctx.rect(grid.getX(i), grid.getY(j), 100, 100);
      ctx.stroke();
    }
  }

  grid.currentCol = 0;
  grid.currentRow = 0;
}
