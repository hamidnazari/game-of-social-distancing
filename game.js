(() => {
  const COLS = 128;
  const ROWS = 80;

  let _sim;

  const _tick = () => {
    _sim.update();
    UI.render();
  };

  const _restart = () => {
    _sim = new Sim(COLS, ROWS);
    UI.setSim(_sim);
    UI.render();
  };

  const setup = () => {
    _sim = new Sim(COLS, ROWS);
    UI.setup(_sim, _tick, _restart, true);
    UI.render();
  };

  setup();
})();
