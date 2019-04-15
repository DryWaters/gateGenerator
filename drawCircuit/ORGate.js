import CircuitItem from './CircuitItem.js';

export default class ORGate extends CircuitItem {
    constructor(x, y, value) {
      super(x, y, 50, 50);
      this.value = value;
    }
  
    draw(ctx) {
      ctx.strokeStyle = "#000";
      ctx.font = "36px serif";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.width, this.y + this.height);
      ctx.stroke();
    }
  }