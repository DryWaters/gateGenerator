import CircuitItem from "./CircuitItem.js";

export default class ANDGate extends CircuitItem {
  constructor(x, y, value) {
    super(x, y, 50, 50, value);
    this.inputLocation = [
      {
        x: x,
        y: y + this.height - 10
      },
      {
        x: x,
        y: y + this.height + 10
      }
    ];
    this.outputLocation = {
      x: x + this.width,
      y: y + this.height
    };
  }

  draw(ctx) {
    ctx.save();
    ctx.scale(1, 0.5);
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y + this.height * 3,
      this.width,
      1.5 * Math.PI,
      0.5 * Math.PI
    );
    ctx.lineTo(this.x, this.y + this.height * 2);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(
      this.inputLocation[0].x,
      this.inputLocation[0].y,
      4,
      0,
      2 * Math.PI
    );
    ctx.arc(
      this.inputLocation[1].x,
      this.inputLocation[1].y,
      4,
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
    ctx.fillText(this.value, this.x + 10, this.y + this.height + 5);
  }
}
