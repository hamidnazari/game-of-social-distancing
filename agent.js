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

  /*
    Directions:
      0  1  2
      3  4  5
      6  7  8
  */
  Agent.prototype.step = function() {
    let direction = RNG.randInteger(0, 9);

    if (direction <= 2) --this.y;
    if (direction >= 6) ++this.y;
    if (direction % 3 == 0) --this.x;
    if (direction % 3 == 2) ++this.x;
  }

  return Agent;
})();
