let Agent = (function() {
  const DEAD_AFTER = 30;

  /*
    Health statuses:
      0 WELL
      1 INFECTED
      2 DEAD
  */
  function Agent(x, y, health) {
    this.x = x;
    this.y = y;
    this.daysInfected = 0;
    this.health = health;
  }

  Agent.prototype.getPosition = function(cols) {
    return this.x + this.y * cols;
  }

  Agent.prototype.isInfected = function() {
    return this.health == 1;
  }

  Agent.prototype.isDead = function() {
    return this.health == 2;
  }

  Agent.prototype.deteriorate = function() {
    if (this.isInfected()) ++this.daysInfected;

    if (this.daysInfected >= DEAD_AFTER) {
      this.health = 2;
    }
  }


  Agent.prototype.update = function(cols, rows) {
    this.deteriorate();
    this.step(cols, rows);
  }

  /*
    Directions:
      0  1  2
      3  4  5
      6  7  8
  */
  Agent.prototype.step = function(cols, rows) {
    if (this.isDead()) return;

    let direction = RNG.randInteger(0, 9);

    if (direction % 3 == 0) --this.x;
    if (direction % 3 == 2) ++this.x;
    if (direction <= 2) --this.y;
    if (direction >= 6) ++this.y;

    if (this.x < 0) this.x = cols - 1;
    if (this.x >= cols) this.x = 0;
    if (this.y < 0) this.y = rows - 1;
    if (this.y >= rows) this.y = 0;
  }

  return Agent;
})();
