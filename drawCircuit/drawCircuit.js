import Grid from "./Grid.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

drawCircuit();

function drawCircuit() {
  const circuit = parseGates();
  const grid = new Grid(circuit.inputs.length);
  addInputs(grid, circuit.inputs);
  addGates(grid, circuit.gates);
  sizeCanvas(grid);
  drawGrid(ctx, grid);
  grid.drawConnections(ctx);
  grid.draw(ctx);
}

function sizeCanvas(grid) {
  const maxWidth = grid.gates.reduce((prevMax, row) => row.length > prevMax ? row.length : prevMax, 0);
  const maxHeight = grid.gates.length;
  canvas.width = grid.offset + maxWidth * 100;
  canvas.height = grid.offset + maxHeight * 100;
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
}

function parseGates() {
  const circuit = {};
  circuit.inputs = circuitData.replace(/[^0-1]/g, "").split("");
  circuit.gates = circuitData.replace(/[0-1]/g, "").split(/(?=[NOA])/);
  return circuit;
}

function drawGrid(ctx, grid) {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 9; j++) {
      ctx.beginPath();
      ctx.strokeStyle="#00FF00AA";
      ctx.rect(
        grid.getX(i),
        grid.getY(j),
        100,
        100
      );
      ctx.stroke();
    }
    
  }

  grid.currentCol = 0;
  grid.currentRow = 0;
}