import CircuitItem from "./CircuitItem.js";

export default class Input extends CircuitItem {
  constructor(x, y, name, value) {
    super(x, y, 50, 50, name, value);
    this.x = x;
    this.y = y;

    this.outputLocation = {
      x: this.x + this.width,
      y: this.y + this.height / 2
    };
  }

  draw(value, ctx) {
    // Draw input
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Draw label
    ctx.beginPath();
    const val = this.value ? 1 : 0;
    ctx.fillStyle = "#000";
    ctx.font = "48px serif";
    ctx.fillText(val, this.x + 13, this.y + 40);

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
