let Sim = (function() {
  const MAX_STEPS = 365 * 3;

  function Sim(rows, cols) {
    this.currentStep = 0;
    this.rows = rows;
    this.cols = cols;
  }

  Sim.prototype.step = function() {
    if (this.currentStep < MAX_STEPS) {
      ++this.currentStep;
    }
  }

  Sim.prototype.update = function() {
    this.step();
  }

  return Sim;
})();
