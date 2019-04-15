import CircuitItem from "./CircuitItem.js";

export default class NOTGate extends CircuitItem {
  constructor(x, y, name, value) {
    super(x, y, 50, 25, name, value);
    this.inputLocation = {
      x: x,
      y: y + this.height * 2
    };
    this.outputLocation = {
      x: x + this.width + 5,
      y: y + this.height * 2
    };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height * 2);
    ctx.lineTo(this.x, this.y + this.height * 3);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      this.x + this.width + 5,
      this.y + this.height * 2,
      5,
      0,
      2 * Math.PI
    );
    ctx.stroke();

    //Draw input connectors
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

    // Draw output connector
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.outputLocation.x, this.outputLocation.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Draw label
    ctx.fillStyle = "#000";
    ctx.font = "24px serif";
    ctx.fillText(this.name, this.x + 5, this.y + this.height * 2 + 5);
  }
}
