let Agent = (function() {
  /*
    Health statuses:
      0 WELL
      1 UNWELL
      2 DEAD
  */
  function Agent(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
  }

  Agent.prototype._getDirection = function() {
    // Math.random()
  }

  Agent.prototype.isSick = function() {
    return this.health == 1;
  }

  Agent.prototype.step = function() {
    // ++this.x;
    // ++this.y;
  }

  return Agent;
})();
