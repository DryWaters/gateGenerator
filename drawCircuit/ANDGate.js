import CircuitItem from "./CircuitItem.js";

const CONNECTOR_SIZE = 4;

export default class ANDGate extends CircuitItem {
  constructor(x, y, value) {
    super(x, y, 25, 50, value);
    this.inputLocation = [
      {
        x: x,
        y: y + this.height * 2 - 10
      },
      {
        x: x,
        y: y + this.height * 2 + 10
      }
    ];
    this.outputLocation = {
      x: x + this.width,
      y: y + this.height * 2
    };
  }

  draw(ctx) {
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
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(
      this.inputLocation[0].x,
      this.inputLocation[0].y,
      CONNECTOR_SIZE,
      0,
      2 * Math.PI
    );
    ctx.arc(
      this.inputLocation[1].x,
      this.inputLocation[1].y,
      CONNECTOR_SIZE,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.outputLocation.x, this.outputLocation.y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = "24px serif";
    ctx.fillText(
      this.value,
      this.x + 5,
      this.y + this.height * 2 + 5
    );
  }
}
