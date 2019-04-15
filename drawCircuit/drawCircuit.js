import Grid from "./Grid.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

drawCircuit();

function drawCircuit() {
  const circuit = parseGates();
  const grid = new Grid(circuit.inputs.length);
  // drawGrid(ctx, grid);
  addInputs(grid, circuit.inputs);
  addGates(grid, circuit.gates);
  grid.draw(ctx);
  // drawInputs({ inputs: circuit.inputs, ctx, grid });
  // console.log(circuit);
  // drawGates({ gates: circuit.gates, ctx, grid });
  // drawConnectors({ ctx, grid });
}

function addInputs(grid, inputs) {
  inputs.forEach(value => {
    grid.addInput(value);
  });
}

function addGates(grid, gates) {
  grid.addGate(gates[0]);
  grid.addGate(gates[1]);
  grid.addGate(gates[2]);
  // gates.forEach(gate => {
  //   grid.addGate(gate);
  // });
}

function parseGates() {
  const circuit = {};
  circuit.inputs = circuitData.replace(/[^0-1]/g, "").split("");
  circuit.gates = circuitData.replace(/[0-1]/g, "").split(/(?=[NOA])/);
  return circuit;
}

function drawGrid(ctx, grid) {
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
  inputs.forEach((input, index) => {
    const inputValue = new Input(
      grid.getX(grid.currentCol),
      grid.getY(grid.currentRow),
      "x".repeat(index + 1),
      input === "0" ? false : true
    );
    inputValue.draw(ctx);
    grid.addGate(inputValue);
    grid.currentRow++;
  });
  grid.currentCol = 0;
  grid.currentRow = 0;
}

function drawGates({ gates, ctx, grid }) {
  grid.currentCol++;
  const and = new ANDGate(
    grid.getX(grid.currentCol),
    grid.getY(grid.currentRow),
    "y1",
    "x"
  );
  grid.addGate(and);
  and.draw(ctx);
}

function drawConnectors({ ctx, grid }) {
  if (grid.gates[0].gate.value === "0") {
    ctx.strokeStyle = "#000";
  } else {
    ctx.strokeStyle = "red";
  }
  ctx.moveTo(
    grid.gates[0].gate.outputLocation.x,
    grid.gates[0].gate.outputLocation.y
  );
  let halfWayX =
    (grid.gates[2].gate.inputLocation[0].x +
      grid.gates[0].gate.outputLocation.x) /
    2;
  ctx.lineTo(halfWayX, grid.gates[0].gate.outputLocation.y);
  ctx.lineTo(halfWayX, grid.gates[2].gate.inputLocation[0].y);
  ctx.lineTo(
    grid.gates[2].gate.inputLocation[0].x,
    grid.gates[2].gate.inputLocation[0].y
  );
  ctx.stroke();

  if (grid.gates[1].gate.value === "0") {
    ctx.strokeStyle = "#000";
  } else {
    ctx.strokeStyle = "red";
  }
  ctx.moveTo(
    grid.gates[1].gate.outputLocation.x,
    grid.gates[1].gate.outputLocation.y
  );

  halfWayX =
    (grid.gates[2].gate.inputLocation[1].x +
      grid.gates[1].gate.outputLocation.x) /
    2;
  ctx.lineTo(halfWayX, grid.gates[1].gate.outputLocation.y);
  ctx.lineTo(halfWayX, grid.gates[2].gate.inputLocation[1].y);
  ctx.lineTo(
    grid.gates[2].gate.inputLocation[1].x,
    grid.gates[2].gate.inputLocation[1].y
  );
  ctx.stroke();
}
