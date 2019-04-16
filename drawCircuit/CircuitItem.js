export default class CircuitItem {
  constructor(x, y, width, height, name, value) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
    this.value = value;
    this.CONNECTOR_SIZE = 4;
  }

  draw(ctx) {}
  drawConnection(x, y, ctx) {}
}
