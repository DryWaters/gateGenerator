import Input from "./Input.js";
import ANDGate from "./ANDGate.js";

export default class Grid {
  constructor(numInputs) {
    this.currentCol = 0;
    this.currentRow = 0;
    this.offset = 50;
    this.gates = new Array(numInputs);
    this.gateLookup = new Map();
    this.currentYValue = 1;
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
    this.gateLookup.set(input.name, {
      value,
      gridLocation: {
        row: this.currentRow++,
        col: 0
      }
    });
  };

  addGate = function(gateDefinition) {
    // parse the gate information
    const gate = this.parseGateDefinintion(gateDefinition);


    console.log(gate);
    // parsing the gate definition to find out which
    // two inputs are used for that gate
    // choose the row that has the longest row to add

    // figure out which gate to create

    // value needs to be generated depending on gate type

    // name is assigned from the next Y name

    // x and y is assigned by the grid using the correct row, col

    // assign it the next Y name, value, and correct row, col

    // const correctRow = findCorrectRow(gate);
    this.gates.push({
      row: this.currentRow,
      col: this.currentRow
      // gate
    });
    // console.log(this.gates);
  };

  getCorrectRow(gateDefinition) {}

  parseGateDefinintion(gateDefinition) {
    let gate = {};
    switch (gateDefinition[0]) {
      case "A": {
        const operands = gateDefinition.substring(1).split("#");
        operands[0] = this.gateLookup.get(operands[0]);
        operands[1] = this.gateLookup.get(operands[1]);
        gate = {
          type: gateDefinition[0],
          value: operands[0].value && operands[1].value,
          operands,
          correctRow:
            operands[0].gridLocation.col > operands[1].gridLocation.col
              ? operands[0].gridLocation.row
              : operands[1].gridLocation.row
        };
        break;
      }
      case "O": {
        const operands = gateDefinition.substring(1).split("#");
        operands[0] = this.gateLookup.get(operands[0]);
        operands[1] = this.gateLookup.get(operands[1]);
        gate = {
          type: gateDefinition[0],
          value: operands[0].value || operands[1].value,
          operands,
          correctRow:
            operands[0].gridLocation.col > operands[1].gridLocation.col
              ? operands[0].gridLocation.row
              : operands[1].gridLocation.row
        };
        break;
      }
      case "N": {
        const operand = gateDefinition.substring(1);
        gate = {
          type: gateDefinition[0],
          value: !operands[0].value,
          operands: [operand],
          correctRow: operands.gridLocation.row
        };
      }
      default: {
        console.error("Bad gate definition!");
      }
    }
    return gate;
  }

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
