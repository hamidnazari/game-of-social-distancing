let Sim = (function() {
  const MAX_STEPS = 365 * 3;

  function Sim(rows, cols) {
    this.currentStep = 0;
    this.rows = rows;
    this.cols = cols;
    this.agents = [];

    for (let i = 0; i < cols; ++i) {
      for (let j = 0; j < rows; ++j) {
        if (Math.random() >= 0.7) {
          let agent = new Agent(i, j);
          this.agents.push(agent);
        }
      }
    }
  }

  Sim.prototype.step = function() {
    if (this.currentStep >= MAX_STEPS) return;

    this.agents.forEach(agent => {
      agent.step();
    })

    ++this.currentStep;
  }

  Sim.prototype.update = function() {
    this.step();
  }

  return Sim;
})();
