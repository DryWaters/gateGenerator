const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

class CircuitItem {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.inputLocation = {
      x: x + this.height / 2,
      y: y + this.width
    };
    this.outputLocation = {
      x: x + this.height / 2,
      y: y + this.width
    };
  }
  draw(ctx) {}
}

class ORGate extends CircuitItem {}

class Input extends CircuitItem {
  constructor(x, y, value) {
    super(x, y, 50, 50);
    this.value = value;
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.font = "48px serif";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillText(this.value, this.x + 13, this.y + 40);
  }
}

class Grid {
  constructor() {
    this.currentCol = 0;
    this.currentRow = 0;
    this.offset = 50;
    this.items = [];
  }

  addItem = function(item) {
    this.items.push({
      row: this.currentRow,
      col: this.currentRow,
      item: item
    });
  };

  getX = function(col) {
    return col * 100 + this.offset;
  };

  getY = function(row) {
    return row * 100 + this.offset;
  };
}

const grid = new Grid();
const circuit = parseGates();
drawInputs({ inputs: circuit.inputs, ctx, grid });
console.log(circuit);

function parseGates() {
  const circuit = {};
  circuit.inputs = circuitData.replace(/[^0-1]/g, "").split("");
  circuit.gates = circuitData.replace(/[0-1]/g, "").split(/(?=[NOA])/);
  return circuit;
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
}
