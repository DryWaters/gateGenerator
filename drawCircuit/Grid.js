import Input from "./Input.js";
import ANDGate from "./ANDGate.js";
import NOTGate from "./NOTGate.js";
import ORGate from "./ORGate.js";

export default class Grid {
  constructor(numInputs) {
    this.rowIndex = 0;
    // Offsets everything a little from the top/left of the screen
    this.offset = 50;

    // Stores all gates/inputs for circuit for drawing
    this.gates = new Array(numInputs);

    // used for quick lookup of which col/row/value
    // a gate/input has, ex. xxx => {object values}
    this.gateLookup = new Map();

    // Used to keep track of which x and y value was
    // used last, for assigning names to gates/inputs
    // ex. xxx    or     yyy
    this.currentYValue = 1;
    this.currentXValue = 1;
  }

  addInput = function(value) {
    const input = new Input(
      this.getX(0),
      this.getY(this.rowIndex),
      "x".repeat(this.currentXValue++),
      value === "0" ? false : true
    );
    this.gates[this.rowIndex] = [];
    this.gates[this.rowIndex].push(input);
    this.gateLookup.set(input.name, {
      value: value === "0" ? false : true,
      gridLocation: {
        row: this.rowIndex++,
        col: 0
      },
      outputLocation: input.outputLocation
    });
  };

  addGate = function(gateDefinition) {
    const parsedGate = this.parseGateDefinintion(gateDefinition);

    switch (parsedGate.type) {
      case "A": {
        const gate = new ANDGate(
          this.getX(this.gates[parsedGate.correctRow].length),
          this.getY(parsedGate.correctRow),
          parsedGate.name,
          parsedGate.value,
          parsedGate.operands
        );
        this.gates[parsedGate.correctRow].push(gate);
        this.gateLookup.set(parsedGate.originalName, {
          value: parsedGate.value,
          gridLocation: {
            row: parsedGate.correctRow,
            col: this.gates[parsedGate.correctRow].length
          },
          outputLocation: gate.outputLocation
        });
        break;
      }
      case "O": {
        const gate = new ORGate(
          this.getX(this.gates[parsedGate.correctRow].length),
          this.getY(parsedGate.correctRow),
          parsedGate.name,
          parsedGate.value,
          parsedGate.operands
        );
        this.gates[parsedGate.correctRow].push(gate);
        this.gateLookup.set(parsedGate.originalName, {
          value: parsedGate.value,
          gridLocation: {
            row: parsedGate.correctRow,
            col: this.gates[parsedGate.correctRow].length
          },
          outputLocation: gate.outputLocation
        });
        break;
      }
      case "N": {
        const gate = new NOTGate(
          this.getX(this.gates[parsedGate.correctRow].length),
          this.getY(parsedGate.correctRow),
          parsedGate.name,
          parsedGate.value,
          parsedGate.operands
        );
        this.gates[parsedGate.correctRow].push(gate);
        this.gateLookup.set(parsedGate.originalName, {
          value: parsedGate.value,
          gridLocation: {
            row: parsedGate.correctRow,
            col: this.gates[parsedGate.correctRow].length
          },
          outputLocation: gate.outputLocation
        });
        break;
      }
      default: {
        console.log("Bad gate definition");
      }
    }
  };

  /* Returns an object representation of the gate string passed
  // to it.  Including the name and which row it should be added to
  //
  // It always adds the gate to whichever is the longest row
  // between the two gates that are feeding into it.  This is 
  // to keep connection lines to go only backwards (no crossing) */
  parseGateDefinintion(gateDefinition) {
    let gate = {};
    switch (gateDefinition[0]) {
      case "A": {
        const operands = gateDefinition.substring(1).split("#");
        const op1 = this.gateLookup.get(operands[0]);
        const op2 = this.gateLookup.get(operands[1]);
        gate = {
          type: gateDefinition[0],
          originalName: "y".repeat(this.currentYValue),
          name: "y" + this.currentYValue++,
          value: op1.value && op2.value,
          operands,
          correctRow:
            op1.gridLocation.col > op2.gridLocation.col
              ? op1.gridLocation.row
              : op2.gridLocation.row
        };
        break;
      }
      case "O": {
        const operands = gateDefinition.substring(1).split("#");
        const op1 = this.gateLookup.get(operands[0]);
        const op2 = this.gateLookup.get(operands[1]);
        gate = {
          type: gateDefinition[0],
          originalName: "y".repeat(this.currentYValue),
          name: "y" + this.currentYValue++,
          value: op1.value || op2.value,
          operands,
          correctRow:
            op1.gridLocation.col > op2.gridLocation.col
              ? op1.gridLocation.row
              : op2.gridLocation.row
        };
        break;
      }
      case "N": {
        const operand = gateDefinition.substring(1);
        const op1 = this.gateLookup.get(operand);
        gate = {
          type: gateDefinition[0],
          originalName: "y".repeat(this.currentYValue),
          name: "y" + this.currentYValue++,
          value: !op1.value,
          operands: [operand],
          correctRow: op1.gridLocation.row
        };
        break;
      }
      default: {
        console.error("Bad gate definition!");
      }
    }
    return gate;
  }

  // helper function that returns the correct X value
  // in pixels if given a col number
  getX = function(col) {
    return col * 100 + this.offset;
  };

  // helper function that returns the correct Y value
  // in pixels if given a row number
  getY = function(row) {
    return row * 100 + this.offset;
  };

  // draws all gates
  draw(ctx) {
    for (let i = 0; i < this.gates.length; i++) {
      for (let j = 0; j < this.gates[i].length; j++) {
        this.gates[i][j].draw(this.gates[i][j].value, ctx);
      }
    }
  }

  // draws all connection lines between gates
  drawConnections(ctx) {
    for (let i = 0; i < this.gates.length; i++) {
      for (let j = 0; j < this.gates[i].length; j++) {
        if (this.gates[i][j].operands) {
          if (
            this.gates[i][j] instanceof NOTGate ||
            this.gates[i][j] instanceof Input
          ) {
            const op1 = this.gateLookup.get(this.gates[i][j].operands[0]);
            this.gates[i][j].drawConnections({
              x: op1.outputLocation.x,
              y: op1.outputLocation.y,
              value: op1.value,
              ctx
            });
          } else {
            const op1 = this.gateLookup.get(this.gates[i][j].operands[0]);
            const op2 = this.gateLookup.get(this.gates[i][j].operands[1]);

            this.gates[i][j].drawConnections({
              gate1: {
                x: op1.outputLocation.x,
                y: op1.outputLocation.y,
                value: op1.value
              },
              gate2: {
                x: op2.outputLocation.x,
                y: op2.outputLocation.y,
                value: op2.value
              },
              ctx
            });
          }
        }
      }
    }
  }

  addFinalState() {
    const finalGate = this.gateLookup.get("y".repeat(this.currentYValue - 1));
    const input = new Input(
      this.getX(finalGate.gridLocation.col),
      this.getY(finalGate.gridLocation.row),
      "final",
      finalGate.value
    );
    input.operands = ["y".repeat(this.currentYValue - 1)];
    this.gates[finalGate.gridLocation.row].push(input);
    this.gateLookup.set(input.name, {
      value: finalGate.value,
      gridLocation: {
        row: finalGate.gridLocation.row,
        col: finalGate.gridLocation.col
      },
      outputLocation: input.outputLocation
    });
  }
}
