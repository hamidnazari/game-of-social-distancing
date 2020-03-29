let Sim = (function() {
  const MAX_STEPS = 365 * 3;
  const DENSITY = 0.2;
  const UNWELLS = 0.005;

  function Sim(rows, cols) {
    this.currentStep = 0;
    this.rows = rows;
    this.cols = cols;
    this.agents = [];

    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        if (RNG.randTrue(DENSITY)) {
          let health = RNG.randTrue(UNWELLS) ? 1 : 0;
          let agent = new Agent(j, i, health);
          this.agents.push(agent);
        }
      }
    }
  }

  Sim.prototype._updateStep = function() {
    if (this.currentStep >= MAX_STEPS) return;

    this.agents.forEach(agent => {
      agent.step();
    })

    ++this.currentStep;
  }

  Sim.prototype.update = function() {
    this._updateStep();
  }

  return Sim;
})();
