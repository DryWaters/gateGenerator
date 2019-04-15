import Input from "./Input.js";
import ANDGate from "./ANDGate.js";
import NOTGate from "./NOTGate.js";
import ORGate from "./ORGate.js";

export default class Grid {
  constructor(numInputs) {
    this.currentCol = 0;
    this.currentRow = 0;
    this.offset = 50;
    this.gates = new Array(numInputs);
    this.gateLookup = new Map();
    this.currentYValue = 1;
    this.currentXValue = 1;
  }

  addInput = function(value) {
    const input = new Input(
      this.getX(this.currentCol),
      this.getY(this.currentRow),
      "x".repeat(this.currentXValue++),
      value === "0" ? false : true
    );
    this.gates[this.currentRow] = [];
    this.gates[this.currentRow].push(input);
    this.gateLookup.set(input.name, {
      value: value === "0" ? false : true,
      gridLocation: {
        row: this.currentRow++,
        col: 0
      }
    });
  };

  addGate = function(gateDefinition) {
    // parse the gate information
    // parsing the gate definition to find out which
    // two inputs are used for that gate
    // choose the row that has the longest row to add
    // figure out which gate to create
    // value needs to be generated depending on gate type
    console.log(this.gateLookup);
    const parsedGate = this.parseGateDefinintion(gateDefinition);

    switch (parsedGate.type) {
      case "A": {
        const gate = new ANDGate(
          this.getX(this.gates[parsedGate.correctRow].length),
          this.getY(parsedGate.correctRow),
          parsedGate.name,
          parsedGate.value
        );
        this.gates[parsedGate.correctRow].push(gate);
        this.gateLookup.set(parsedGate.originalName, {
          value: parsedGate.value,
          gridLocation: {
            row: parsedGate.correctRow,
            col: this.gates[parsedGate.correctRow].length
          }
        });
        break;
      }
      case "O": {
        const gate = new ORGate(
          this.getX(this.gates[parsedGate.correctRow].length),
          this.getY(parsedGate.correctRow),
          parsedGate.name,
          parsedGate.value
        );
        this.gates[parsedGate.correctRow].push(gate);
        this.gateLookup.set(parsedGate.originalName, {
          value: parsedGate.value,
          gridLocation: {
            row: parsedGate.correctRow,
            col: this.gates[parsedGate.correctRow].length
          }
        });
        break;
      }
      case "N": {
        const gate = new NOTGate(
          this.getX(this.gates[parsedGate.correctRow].length),
          this.getY(parsedGate.correctRow),
          parsedGate.name,
          parsedGate.value
        );
        this.gates[parsedGate.correctRow].push(gate);
        this.gateLookup.set(parsedGate.originalName, {
          value: parsedGate.value,
          gridLocation: {
            row: parsedGate.correctRow,
            col: this.gates[parsedGate.correctRow].length
          }
        });
        break;
      }
      default: {
        console.log("Bad gate definition");
      }
    }

    // name is assigned from the next Y name

    // x and y is assigned by the grid using the correct row, col

    // assign it the next Y name, value, and correct row, col

    // const correctRow = findCorrectRow(gate);

    console.log(this.gateLookup);
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
          originalName: "y".repeat(this.currentYValue + 1),
          name: "y" + this.currentYValue++,
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
        console.log(operands);
        gate = {
          type: gateDefinition[0],
          originalName: "y".repeat(this.currentYValue + 1),
          name: "y" + this.currentYValue++,
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
        const operand = this.gateLookup.get(gateDefinition.substring(1));
        gate = {
          type: gateDefinition[0],
          originalName: "y".repeat(this.currentYValue + 1),
          name: "y" + this.currentYValue++,
          value: !operand.value,
          operands: [operand],
          correctRow: operand.gridLocation.row
        };
        break;
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
