import CircuitItem from "./CircuitItem.js";

export default class Input extends CircuitItem {
  constructor(x, y, value) {
    super(x, y, 50, 50, value);
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.font = "48px serif";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillText(this.value, this.x + 13, this.y + 40);
  }
}
