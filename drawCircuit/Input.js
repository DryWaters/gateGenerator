import CircuitItem from "./CircuitItem.js";

export default class Input extends CircuitItem {
  constructor(x, y, name, value) {
    super(x, y, 50, 50, name, value);
    this.x = x;
    this.y = y;

    this.inputLocation = {
      x: this.x,
      y: this.y + this.height / 2
    };

    this.outputLocation = {
      x: this.x + this.width,
      y: this.y + this.height / 2
    };
  }

  draw(value, ctx) {
    // Draw input

    // if input is 1 (true) outline
    // it in red, else black
    if (value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Draw label
    ctx.beginPath();
    const val = this.value ? 1 : 0;
    ctx.fillStyle = "#000";
    ctx.font = "48px serif";
    ctx.fillText(val, this.x + 13, this.y + 40);

    // if this input is used as final output for
    // circuit, draw the inputLocation but not
    // the outputlocation as there will not be
    // anything after this input
    if (this.name === "final") {
      // Draw input connector endpoints
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
    }

    if (this.name !== "final") {
      // Draw output connector endpoints
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
    }
  }

  // This method will only be called on the final input
  // as other inputs are the first items in the circuit
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
