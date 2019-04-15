export default class Grid {
    constructor() {
      this.currentCol = 0;
      this.currentRow = 0;
      this.offset = 50;
      this.gates = [];
    }
  
    addGate = function(gate) {
      this.gates.push({
        row: this.currentRow,
        col: this.currentRow,
        gate: gate
      });
    };
  
    getX = function(col) {
      return col * 100 + this.offset;
    };
  
    getY = function(row) {
      return row * 100 + this.offset;
    };
  }