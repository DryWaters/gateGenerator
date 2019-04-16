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

    if (this.name === "final") {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(
        this.inputLocation.x,
        this.inputLocation.y,
        this.CONNECTOR_SIZE,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    if (this.name !== "final") {
      // Draw connector endpoints
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(
        this.outputLocation.x,
        this.outputLocation.y,
        this.CONNECTOR_SIZE,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  drawConnections({ x, y, value, ctx }) {
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
