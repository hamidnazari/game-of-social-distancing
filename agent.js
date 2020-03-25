let Agent = (function() {
  function Agent(gfx, x, y, size) {
    this.gfx = gfx;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  Agent.prototype.draw = function() {
    this.gfx.beginFill(0xFFFF00);
    this.gfx.drawRect(this.x, this.y, this.size, this.size);
  }

  Agent.prototype.update = function() {
  }

  return Agent;
})();
