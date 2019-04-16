export default class CircuitItem {
  constructor(x, y, width, height, name, value) {
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

  draw(ctx) {}
  drawConnection(x, y, ctx) {}
}
