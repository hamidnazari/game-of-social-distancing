const Metrics = (() => { // eslint-disable-line no-unused-vars
  const _setValue = function _setValue(id, value) {
    document.getElementById(id).innerText = value;
  };

  return {
    print(sim) {
      _setValue('people_count', sim.agentCount);
      _setValue('alive_count', sim.agentAliveCount);
      _setValue('healthy_count', sim.agentHealthyCount);
      _setValue('infected_count', sim.agentInfectedCount);
      _setValue('dead_count', sim.agentDeadCount);
      _setValue('buried_count', sim.agentBuriedCount);
      _setValue('day_number', sim.currentStep + 1);
    },
  };
})();
