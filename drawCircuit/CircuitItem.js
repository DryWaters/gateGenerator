export default class CircuitItem {
  constructor(x, y, width, height, name, value) {

    // Add some randomOffset to try and  keep lines from overlapping
    // on connector lines
    const randomOffsetX = Math.floor(Math.random() * 20);
    const randomOffsetY = Math.floor(Math.random() * 20);
    this.x = x + randomOffsetX;
    this.y = y + randomOffsetY;
    this.width = width;
    this.height = height;
    this.name = name;
    this.value = value;
    this.CONNECTOR_SIZE = 4;
  }

  // Draws the actual gate, connectors, and label
  draw(ctx) {}

  // Draws the connection lines between itself and the 
  // gate that connects to it
  drawConnection(x, y, ctx) {}
}
