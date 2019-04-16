import CircuitItem from "./CircuitItem.js";

export default class ANDGate extends CircuitItem {
  constructor(x, y, name, value, operands) {
    super(x, y, 50, 25, name, value);
    this.operands = operands;
    this.inputLocation = [
      {
        x: this.x,
        y: this.y + this.height * 2 - 10
      },
      {
        x: this.x,
        y: this.y + this.height * 2 + 10
      }
    ];
    this.outputLocation = {
      x: this.x + this.width,
      y: this.y + this.height * 2
    };
  }

  draw(value, ctx) {
    // Draw gate
    
    // if gate is 1 (true) outline
    // it in red, else black
    if (value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    ctx.fillStyle = "#FFF";

    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y + this.height * 2,
      this.width,
      this.height,
      0, // rotation from starting location
      1.5 * Math.PI, // starting location of arc in radians
      0.5 * Math.PI // ending location of arc in radians
    );
    ctx.lineTo(this.x, this.y + this.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw input connector
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(
      this.inputLocation[0].x,
      this.inputLocation[0].y,
      this.CONNECTOR_SIZE,
      0, // starting location of arc in radians
      2 * Math.PI // ending location of arc in radians
    );
    ctx.arc(
      this.inputLocation[1].x,
      this.inputLocation[1].y,
      this.CONNECTOR_SIZE,
      0, // starting location of arc in radians
      2 * Math.PI // ending location of arc in radians
    );
    ctx.fill();

    // Draw output connectors
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      this.outputLocation.x,
      this.outputLocation.y,
      this.CONNECTOR_SIZE,
      0, // starting location of arc in radians
      2 * Math.PI // ending location of arc in radians
    );
    ctx.fill();

    // Draw gate label
    ctx.fillStyle = "#000";
    ctx.font = "24px serif";
    const LABEL_OFFSET = 5;
    ctx.fillText(
      this.name,
      this.x + LABEL_OFFSET,
      this.y + this.height * 2 + LABEL_OFFSET
    );
  }

  drawConnections({ gate1, gate2, ctx }) {
    // Figure out which gate that feeds into this gate
    // is above this one so that the lines do not
    // cross when they connect
    let topGate, bottomGate;
    if (gate1.y < gate2.y) {
      topGate = gate1;
      bottomGate = gate2;
    } else {
      topGate = gate2;
      bottomGate = gate1;
    }

    // if gate that is feeding into this one
    // is 1 (true), color it red
    if (topGate.value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    let halfway = (this.inputLocation[0].x + topGate.x) / 2;
    ctx.beginPath();
    ctx.moveTo(this.inputLocation[0].x, this.inputLocation[0].y);
    ctx.lineTo(halfway, this.inputLocation[0].y);
    ctx.lineTo(halfway, topGate.y);
    ctx.lineTo(topGate.x, topGate.y);
    ctx.stroke();

    // if gate that is feeding into this one
    // is 1 (true), color it red
    if (bottomGate.value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    halfway = (this.inputLocation[1].x + bottomGate.x) / 2;
    ctx.beginPath();
    ctx.moveTo(this.inputLocation[1].x, this.inputLocation[1].y);
    ctx.lineTo(halfway, this.inputLocation[1].y);
    ctx.lineTo(halfway, bottomGate.y);
    ctx.lineTo(bottomGate.x, bottomGate.y);
    ctx.stroke();
  }
}
