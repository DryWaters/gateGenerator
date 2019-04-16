import CircuitItem from "./CircuitItem.js";

export default class ANDGate extends CircuitItem {
  constructor(x, y, name, value, operands) {
    super(x, y, 50, 25, name, value);
    this.operands = operands;
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

  draw(value, ctx) {
    // Draw gate
    if (value) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "#000";
    }
    ctx.fillStyle = "#FFF";
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
    ctx.closePath();
    ctx.fill();
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
    ctx.lineTo(halfway, this.inputLocation[0].y)
    ctx.lineTo(halfway, topGate.y)
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
    ctx.lineTo(halfway, this.inputLocation[1].y)
    ctx.lineTo(halfway, bottomGate.y)
    ctx.lineTo(bottomGate.x, bottomGate.y);
    ctx.stroke();
  }
}
