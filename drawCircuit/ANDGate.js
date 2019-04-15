import CircuitItem from "./CircuitItem.js";

export default class ANDGate extends CircuitItem {
  constructor(x, y, name, value) {
    super(x, y, 50, 25, name, value);
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

  draw(ctx) {
    // Draw gate
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y + this.height * 2,
      this.width,
      this.height,
      0,
      1.5 * Math.PI,
      0.5 * Math.PI
    );
    ctx.lineTo(this.x, this.y + this.height);
    ctx.stroke();

    // Draw input connector
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(
      this.inputLocation[0].x,
      this.inputLocation[0].y,
      this.CONNECTOR_SIZE,
      0,
      2 * Math.PI
    );
    ctx.arc(
      this.inputLocation[1].x,
      this.inputLocation[1].y,
      this.CONNECTOR_SIZE,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw output connectors
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.outputLocation.x, this.outputLocation.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Draw gate name
    ctx.fillStyle = "#000";
    ctx.font = "24px serif";
    ctx.fillText(this.name, this.x + 5, this.y + this.height * 2 + 5);
  }
}
