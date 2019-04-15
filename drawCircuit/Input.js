import CircuitItem from "./CircuitItem.js";

export default class Input extends CircuitItem {
  constructor(x, y, value) {
    super(x, y, 50, 50, value);
    this.outputLocation = {
      x: x + this.width,
      y: y + this.height / 2
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.font = "48px serif";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillText(this.value, this.x + 13, this.y + 40);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.outputLocation.x, this.outputLocation.y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}
