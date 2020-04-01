const Sim = (() => { // eslint-disable-line no-unused-vars
  const MAX_STEPS = 365 * 3;
  const DENSITY_RATE = 0.5;
  const INFECTED_RATE = 0.005;

  const _initAgents = (cols, rows) => {
    const agents = [];
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        if (RNG.randTrue(DENSITY_RATE)) {
          const health = RNG.randTrue(INFECTED_RATE) ? 1 : 0;
          const agent = new Agent(j, i, health);
          agents.push(agent);
        }
      }
    }
    return agents;
  };

  const _count = (sim) => {
    sim.agentInfectedCount = 0;
    sim.agentDeadCount = 0;
    sim.agentBuriedCount = 0;

    sim.agents.forEach((a) => {
      if (a.isInfected()) sim.agentInfectedCount += 1;
      else if (a.isDead()) sim.agentDeadCount += 1;
      else if (a.isBuried()) sim.agentBuriedCount += 1;
    });

    sim.agentAliveCount = sim.agentCount - sim.agentDeadCount - sim.agentBuriedCount;
    sim.agentHealthyCount = sim.agentAliveCount - sim.agentInfectedCount;
  };

  function _Sim(cols, rows) {
    this.currentStep = 0;
    this.cols = cols;
    this.rows = rows;
    this.agents = _initAgents(cols, rows);
    this.agentCount = this.agents.length;
    _count(this);
  }

  const _doTransmissions = (sim) => {
    const placements = sim.agents.reduce((state, agent) => {
      const position = agent.getPosition(sim.cols);
      if (!state[position]) {
        state[position] = [];
      }
      state[position].push(agent);
      return state;
    }, {});

    const closeContacts = Object.values(placements).filter((p) => p.length > 1);
    closeContacts.forEach((idiots) => {
      if (idiots.find((idiot) => idiot.isInfected())) {
        idiots.forEach((fucked) => { fucked.health = 1; });
      }
    });
  };

  _Sim.prototype.update = function update() {
    if (this.currentStep >= MAX_STEPS) return;

    this.agents.forEach((agent) => agent.update(this.cols, this.rows));

    _doTransmissions(this);
    _count(this);

    this.currentStep += 1;
  };

  return _Sim;
})();
