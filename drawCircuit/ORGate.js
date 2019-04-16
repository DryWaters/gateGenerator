import CircuitItem from "./CircuitItem.js";

export default class ORGate extends CircuitItem {
  constructor(x, y, name, value, operands) {
    super(x, y, 65, 25, name, value);
    this.operands = operands;
    this.inputLocation = [
      {
        x: this.x + 5,
        y: this.y + this.height * 2 - 10
      },
      {
        x: this.x + 5,
        y: this.y + this.height * 2 + 10
      }
    ];
    this.outputLocation = {
      x: this.x + this.width,
      y: this.y + this.height * 2 - 2
    };
  }

  draw(value, ctx) {
    // Draw actual gate
    if (value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }

    ctx.beginPath();
    const x = this.x;
    const y = this.y + 25;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + 27, y, x + 51, y + 6, x + 65, y + 22);
    ctx.bezierCurveTo(x + 55, y + 40, x + 26, y + 48, x, y + 49);
    ctx.bezierCurveTo(x + 3, y + 39, x + 10, y + 25, x + 10, y + 25);
    ctx.bezierCurveTo(x + 8, y + 18, x + 3, y + 6, x, y);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fill();

    ctx.beginPath();
    // Draw input locations
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

    // Draw output location
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.outputLocation.x, this.outputLocation.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Draw label
    ctx.fillStyle = "#000";
    ctx.font = "24px serif";
    ctx.fillText(this.name, this.x + 12, this.y + this.height * 2 + 5);
  }

  drawConnections({ gate1, gate2, ctx }) {
    let topGate, bottomGate;
    if (gate1.y < gate2.y) {
      topGate = gate1;
      bottomGate = gate2;
    } else {
      topGate = gate2;
      bottomGate = gate1;
    }

    if (topGate.value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    let halfway = (this.inputLocation[0].x + topGate.x) / 2;
    ctx.beginPath();
    ctx.moveTo(this.inputLocation[0].x, this.inputLocation[0].y);
    ctx.lineTo(halfway, this.inputLocation[0].y);
    ctx.lineTo(halfway, topGate.y);
    ctx.lineTo(topGate.x, topGate.y);
    ctx.stroke();

    if (bottomGate.value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    halfway = (this.inputLocation[1].x + bottomGate.x) / 2;
    ctx.beginPath();
    ctx.moveTo(this.inputLocation[1].x, this.inputLocation[1].y);
    ctx.lineTo(halfway, this.inputLocation[1].y);
    ctx.lineTo(halfway, bottomGate.y);
    ctx.lineTo(bottomGate.x, bottomGate.y);
    ctx.stroke();
  }
}
