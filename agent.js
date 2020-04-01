const Agent = (() => { // eslint-disable-line no-unused-vars
  const MAX_INFECTED_DAYS = 30;
  const MAX_DEAD_DAYS = 10;

  /*
    Health statuses:
      0 WELL
      1 INFECTED
      2 DEAD
      3 BURIED
  */
  function _Agent(x, y, health) {
    this.x = x;
    this.y = y;
    this.daysInfected = 0;
    this.daysDead = 0;
    this.health = health;
  }

  _Agent.prototype.getPosition = function getPosition(cols) {
    return this.x + this.y * cols;
  };

  _Agent.prototype.isInfected = function isInfected() {
    return this.health === 1;
  };

  _Agent.prototype.isDead = function isDead() {
    return this.health === 2;
  };

  _Agent.prototype.isBuried = function isBuried() {
    return this.health === 3;
  };

  _Agent.prototype.deteriorate = function deteriorate() {
    if (this.isDead()) {
      this.daysDead += 1;

      if (this.daysDead >= MAX_DEAD_DAYS) {
        this.health = 3;
      }

      return;
    }

    if (this.isInfected()) {
      this.daysInfected += 1;

      if (this.daysInfected >= MAX_INFECTED_DAYS) {
        this.health = 2;
      }
    }
  };

  _Agent.prototype.update = function update(cols, rows) {
    this.deteriorate();
    this.step(cols, rows);
  };

  /*
    Directions:
      0  1  2
      3  4  5
      6  7  8
  */
  _Agent.prototype.step = function step(cols, rows) {
    if (this.isDead()) return;

    const direction = RNG.randInteger(0, 9);

    if (direction % 3 === 0) this.x -= 1;
    if (direction % 3 === 2) this.x += 1;
    if (direction <= 2) this.y -= 1;
    if (direction >= 6) this.y += 1;

    if (this.x < 0) this.x = cols - 1;
    if (this.x >= cols) this.x = 0;
    if (this.y < 0) this.y = rows - 1;
    if (this.y >= rows) this.y = 0;
  };

  return _Agent;
})();
