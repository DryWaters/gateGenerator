import CircuitItem from "./CircuitItem.js";

export default class ORGate extends CircuitItem {
  constructor(x, y, name, value, operands) {
    super(x, y, 65, 25, name, value);
    this.operands = operands;
    this.inputLocation = [
      {
        x: this.x + 5,
        y: this.y + this.height * 2 - 10
      },
      {
        x: this.x + 5,
        y: this.y + this.height * 2 + 10
      }
    ];
    this.outputLocation = {
      x: this.x + this.width,
      y: this.y + this.height * 2 - 2
    };
  }

  draw(value, ctx) {
    // Draw actual gate

    // if gate is 1 (true) outline
    // it in red, else black
    if (value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }

    // Fancy bezierCurves for the OR gate
    // Used http://canvimation.github.io/ to help generate the
    // offset values
    ctx.beginPath();
    const x = this.x;
    const y = this.y + 25;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + 27, y, x + 51, y + 6, x + 65, y + 22);
    ctx.bezierCurveTo(x + 55, y + 40, x + 26, y + 48, x, y + 49);
    ctx.bezierCurveTo(x + 3, y + 39, x + 10, y + 25, x + 10, y + 25);
    ctx.bezierCurveTo(x + 8, y + 18, x + 3, y + 6, x, y);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Draw input locations
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

    // Draw output location
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

    // Draw label
    ctx.fillStyle = "#000";
    ctx.font = "24px serif";
    ctx.fillText(this.name, this.x + 12, this.y + this.height * 2 + 5);
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
