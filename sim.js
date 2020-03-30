let Sim = (function() {
  const MAX_STEPS = 365 * 3;
  const DENSITY = 0.20;
  const UNWELLS = 0.005;

  function Sim(cols, rows) {
    this.currentStep = 0;
    this.cols = cols;
    this.rows = rows;
    this.agents = _initAgents(cols, rows);
  }

  const _initAgents = (cols, rows) => {
    agents = [];
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        if (RNG.randTrue(DENSITY)) {
          let health = RNG.randTrue(UNWELLS) ? 1 : 0;
          let agent = new Agent(j, i, health);
          agents.push(agent);
        }
      }
    }
    return agents;
  }

  const _doTransmissions = (agents, cols) => {
    const placements = agents.reduce((state, agent) => {
      let position = agent.getPosition(cols);
      if (!state[position]) {
        state[position] = []
      }
      state[position].push(agent);
      return state;
    }, {});

    const overlapped = Object.values(placements).filter(p => p.length > 1);

    overlapped.forEach(idiots => {
      if (idiots.find(idiot => idiot.isSick())) {
        idiots.forEach(fucked => fucked.health = 1)
      }
    })

    return overlapped;
  }

  Sim.prototype.update = function() {
    if (this.currentStep >= MAX_STEPS) return;

    this.agents.forEach(agent => agent.step(this.cols, this.rows))

    _doTransmissions(agents, this.cols);

    ++this.currentStep;
  }

  return Sim;
})();
