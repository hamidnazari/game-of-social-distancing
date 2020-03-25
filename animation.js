(function() {
  const SPEED = 1000;

  const ROWS = 60;
  const COLS = 80;
  const CELL_SIZE = 10;

  let speedModifier = 0.5;
  let timeout = SPEED * speedModifier;
  let pixi, gfx, sim;

  const tick = () => {
    sim.update();
  }

  const setup = () => {
    pixi = new PIXI.Application({
        width: COLS * CELL_SIZE,
        height: ROWS * CELL_SIZE,
        backgroundColor: 0xAAAAAA
    });
    gfx = new PIXI.Graphics();
    pixi.stage.addChild(gfx);
    document.body.appendChild(pixi.view);

    agent = new Agent(gfx, 20, 20, CELL_SIZE);
    sim = new Sim(ROWS, COLS);


    agent.draw();

    window.setInterval(tick, timeout);
    tick();
  }


  setup();
})();
