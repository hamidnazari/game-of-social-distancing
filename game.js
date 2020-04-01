(() => {
  const COLS = 128;
  const ROWS = 80;
  const SPEED = 1000;

  const speedModifier = 2;
  const timeout = SPEED / speedModifier;
  let sim;

  const tick = () => {
    sim.update();
    UI.render();
  };

  const setup = () => {
    sim = new Sim(COLS, ROWS);
    UI.setup(sim);
    UI.render();
    window.setInterval(tick, timeout);
  };

  setup();
})();
