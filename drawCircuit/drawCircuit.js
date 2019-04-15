import ORGate from "./ORGate.js";
import ANDGate from "./ANDGate.js";

import Input from "./Input.js";
import Grid from "./Grid.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const grid = new Grid();
const circuit = parseGates();
drawGrid({ ctx, grid });
drawInputs({ inputs: circuit.inputs, ctx, grid });
console.log(circuit);
drawGates({ gates: circuit.gates, ctx, grid });

function parseGates() {
  const circuit = {};
  circuit.inputs = circuitData.replace(/[^0-1]/g, "").split("");
  circuit.gates = circuitData.replace(/[0-1]/g, "").split(/(?=[NOA])/);
  return circuit;
}

function drawGrid({ ctx, grid }) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.rect(
        grid.getX(grid.currentCol),
        grid.getY(grid.currentRow),
        100,
        100
      );
      ctx.stroke();
      grid.currentCol++;
    }
    grid.currentCol = 0;
    grid.currentRow++;
  }

  grid.currentCol = 0;
  grid.currentRow = 0;
}

function drawInputs({ inputs, ctx, grid }) {
  inputs.forEach(input => {
    const inputValue = new Input(
      grid.getX(grid.currentCol),
      grid.getY(grid.currentRow),
      input
    );
    inputValue.draw(ctx);
    grid.addItem();
    grid.currentRow++;
  });
  grid.currentCol = 1;
  grid.currentRow = 0;

}

function drawGates({ gates, ctx, grid }) {
  // grid.currentRow++;
  const and = new ANDGate(
    grid.getX(grid.currentCol),
    grid.getY(grid.currentRow),
    'y1'
  );
  and.draw(ctx);
}
