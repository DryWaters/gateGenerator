import CircuitItem from "./CircuitItem.js";

export default class NOTGate extends CircuitItem {
  constructor(x, y, name, value, operands) {
    super(x, y, 50, 25, name, value);
    this.operands = operands;
    this.inputLocation = {
      x: this.x,
      y: this.y + this.height * 2
    };
    this.outputLocation = {
      x: this.x + this.width + 5,
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
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height * 2);
    ctx.lineTo(this.x, this.y + this.height * 3);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // draw end ball connector on NOT gate
    const BALL_SIZE = 5;
    ctx.beginPath();
    ctx.arc(
      this.x + this.width + 5,
      this.y + this.height * 2,
      BALL_SIZE,
      0, // starting location of arc in radians
      2 * Math.PI // ending location of arc in radians
    );
    ctx.stroke();
    ctx.fill();

    //Draw input connectors
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(
      this.inputLocation.x,
      this.inputLocation.y,
      this.CONNECTOR_SIZE,
      0, // starting location of arc in radians
      2 * Math.PI // ending location of arc in radians
    );

    ctx.fill();

    // Draw output connector
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
    ctx.fillText(this.name, this.x + 5, this.y + this.height * 2 + 5);
  }

  drawConnections({ x, y, value, ctx }) {
    // if gate that is feeding into this one
    // is 1 (true), color it red
    if (value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    let halfway = (this.inputLocation.x + x) / 2;
    ctx.beginPath();
    ctx.moveTo(this.inputLocation.x, this.inputLocation.y);
    ctx.lineTo(halfway, this.inputLocation.y);
    ctx.lineTo(halfway, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
