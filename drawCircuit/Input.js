import CircuitItem from "./CircuitItem.js";

export default class Input extends CircuitItem {
  constructor(x, y, name, value) {
    super(x, y, 50, 50, name, value);
    this.outputLocation = {
      x: this.x + this.width,
      y: this.y + this.height / 2
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.font = "48px serif";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    const val = this.value ? 1 : 0;
    ctx.fillText(val, this.x + 13, this.y + 40);

    // Draw connector endpoints
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.outputLocation.x, this.outputLocation.y, this.CONNECTOR_SIZE, 0, 2 * Math.PI);
    ctx.fill();
  }
}
