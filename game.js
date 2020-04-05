(() => {
  const COLS = 128;
  const ROWS = 80;

  const _tick = (sim) => {
    sim.update();
    UI.render();
  };

  const _setup = (callback) => {
    RNG.seed(UI.inputs.getRandomSeed());
    const sim = new Sim({
      cols: COLS,
      rows: ROWS,
      densityRate: UI.inputs.getDensityRate(),
      infectedRate: UI.inputs.getInfectedRate(),
      transmissionRate: UI.inputs.getTransmissionRate(),
      recoverabilityRate: UI.inputs.getRecoverabilityRate(),
      infectionPeriod: UI.inputs.getInfectionPeriod(),
    });
    callback(sim);
    UI.render();
  };

  const _restart = () => {
    _setup((sim) => {
      UI.setSim(sim);
    });
  };

  const run = () => {
    _setup((sim) => {
      UI.setup(sim, _tick, _restart);
    });
  };

  run();
})();
