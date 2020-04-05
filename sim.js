const Sim = (() => { // eslint-disable-line no-unused-vars
  const MAX_STEPS = 365 * 3;

  const _initAgents = (options) => {
    const agents = [];
    for (let i = 0; i < options.rows; ++i) {
      for (let j = 0; j < options.cols; ++j) {
        if (RNG.randTrue(options.densityRate)) {
          const agent = new Agent({
            x: j,
            y: i,
            isHealthy: RNG.randFalse(options.infectedRate),
            recoverabilityRate: options.recoverabilityRate,
            infectionPeriod: options.infectionPeriod,
          });
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

  function _Sim(options) {
    this.currentStep = 0;
    this.cols = options.cols;
    this.rows = options.rows;
    this.transmissionRate = options.transmissionRate;
    this.agents = _initAgents(options);
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
        idiots.forEach((fucked) => {
          if (RNG.randTrue(sim.transmissionRate)) {
            fucked.setInfected();
          }
        });
      }
    });
  };

  _Sim.prototype.isOver = function isOver() {
    return (this.agentInfectedCount === 0 && this.agentDeadCount === 0)
           || this.currentStep >= MAX_STEPS;
  };

  _Sim.prototype.update = function update() {
    if (this.isOver()) return;

    this.agents.forEach((agent) => agent.update(this.cols, this.rows));

    _doTransmissions(this);
    _count(this);

    this.currentStep += 1;
  };

  return _Sim;
})();
