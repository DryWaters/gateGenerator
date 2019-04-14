const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const circuit = parseGates();
drawInputs({ inputs: circuit.inputs, ctx });
console.log(circuit);

function parseGates() {
  const circuit = {};
  circuit.inputs = circuitData.replace(/[^0-1]/g, "").split("");
  circuit.gates = circuitData.replace(/[0-1]/g, "").split(/(?=[NOA])/);
  return circuit;
}

function drawInputs({ inputs, ctx }) {
  ctx.fillStyle = "#000";
  ctx.font = "48px serif";
  inputs.forEach((input, index) => {
    ctx.strokeRect(10, 100 + 200 * index, 50, 50);
    ctx.fillText(input, 23, 140 + 200 * index);
  });
}

function drawORGate({ ctx, x, y }) {
  ctx.fillStyle = "#000";
  ctx.font = "36px serif";
}
