(() => {
  const COLS = 128;
  const ROWS = 80;

  let _sim;

  const _tick = () => {
    _sim.update();
    UI.render();
  };

  const _restart = () => {
    RNG.seed(UI.inputs.randomSeed());
    _sim = new Sim(COLS, ROWS, UI.inputs.densityRate(), UI.inputs.infectedRate());
    UI.setSim(_sim);
    UI.render();
  };

  const setup = () => {
    RNG.seed(UI.inputs.randomSeed());
    _sim = new Sim(COLS, ROWS, UI.inputs.densityRate(), UI.inputs.infectedRate());
    UI.setup(_sim, _tick, _restart, true);
    UI.render();
  };

  setup();
})();
