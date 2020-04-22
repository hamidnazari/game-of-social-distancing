import RNG from './rng';

const Agent = (() => { // eslint-disable-line no-unused-vars
  const MAX_UNBURIED_DAYS = 7;

  /*
    Health statuses:
      0 WELL
      1 INFECTED
      2 DEAD
      3 BURIED
  */
  function _Agent(options) {
    this.x = options.x;
    this.y = options.y;
    this.recoverabilityRate = options.recoverabilityRate;
    this.infectionPeriod = options.infectionPeriod;
    this.health = 0;
    options.isHealthy ? this.setHealthy() : this.setInfected();
  }

  _Agent.prototype.getPosition = function getPosition(cols) {
    return this.x + this.y * cols;
  };

  _Agent.prototype.setHealthy = function setInfected() {
    this.health = 0;
    this.daysInfected = 0;
  };

  _Agent.prototype.setInfected = function setInfected() {
    if (this.health === 0) {
      this.health = 1;
      this.daysInfected = 0;
    }
  };

  _Agent.prototype.isInfected = function isInfected() {
    return this.health === 1;
  };

  _Agent.prototype.setDead = function setDead() {
    this.health = 2;
    this.daysDead = 0;
  };

  _Agent.prototype.isDead = function isDead() {
    return this.health === 2;
  };

  _Agent.prototype.setBuried = function setBuried() {
    if (this.health === 2) {
      this.health = 3;
    }
  };

  _Agent.prototype.isBuried = function isBuried() {
    return this.health === 3;
  };

  _Agent.prototype.stepHealth = function stepHealth() {
    if (this.isDead()) {
      this.daysDead += 1;

      if (this.daysDead >= MAX_UNBURIED_DAYS) {
        this.setBuried();
      }
    } else if (this.isInfected()) {
      this.daysInfected += 1;

      if (this.daysInfected >= this.infectionPeriod) {
        RNG.randTrue(this.recoverabilityRate) ? this.setHealthy() : this.setDead();
      }
    }
  };

  _Agent.prototype.isDeactivated = function isDeactivated() {
    return this.isDead() || this.isBuried();
  };

  _Agent.prototype.update = function update(cols, rows) {
    this.stepHealth();
    this.step(cols, rows);
  };

  /*
    Directions:
      0  1  2
      3  4  5
      6  7  8
  */
  _Agent.prototype.step = function step(cols, rows) {
    if (this.isDeactivated()) return;

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

export default Agent;
