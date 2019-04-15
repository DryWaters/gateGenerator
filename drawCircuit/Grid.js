import Input from "./Input.js";
import ANDGate from "./ANDGate.js";

export default class Grid {
  constructor(numInputs) {
    this.currentCol = 0;
    this.currentRow = 0;
    this.offset = 50;
    this.gates = new Array(numInputs);
    this.gateLookup = new Map();
  }

  addInput = function(value) {
    const input = new Input(
      this.getX(this.currentCol),
      this.getY(this.currentRow),
      "x".repeat(this.currentRow + 1),
      value === "0" ? false : true
    );
    this.gates[this.currentRow] = [];
    this.gates[this.currentRow].push(input);
    this.gateLookup.set(input.name, [this.currentRow++, 0]);
  };

  addGate = function(gate) {
    console.log(gate);
    // const correctRow = findCorrectRow(gate);
    this.gates.push({
      row: this.currentRow,
      col: this.currentRow,
      gate
    });
    // console.log(this.gates);
  };

  getX = function(col) {
    return col * 100 + this.offset;
  };

  getY = function(row) {
    return row * 100 + this.offset;
  };

  draw(ctx) {
    for (let i = 0; i < this.gates.length; i++) {
      for (let j = 0; j < this.gates[i].length; j++) {
        this.gates[i][j].draw(ctx);
      }
    }
  }
}
