let Agent = (function() {
  function Agent(x, y) {
    this.x = x;
    this.y = y;
  }

  Agent.prototype.step = function() {
    ++this.x;
  }

  return Agent;
})();
