(function() {
  const ROWS = 80;
  const COLS = 128;
  const CELL_SIZE = 10;

  const SPEED = 1000;

  let speedModifier = 0.5;
  let timeout = SPEED * speedModifier;
  let pixi, gfx, sim;

  const tick = () => {
    sim.update();
    draw();
  }

  const setup = () => {
    setupCanvas();
    sim = new Sim(ROWS, COLS);

    window.setInterval(tick, timeout);
    tick();
  }

  const setupCanvas = () => {
    pixi = new PIXI.Application({
      width: COLS * CELL_SIZE,
      height: ROWS * CELL_SIZE,
      backgroundColor: 0xAAAAAA
    });
    gfx = new PIXI.Graphics();
    pixi.stage.addChild(gfx);
    document.body.appendChild(pixi.view);
  }


  const draw = () => {
    gfx.clear();

    sim.agents.forEach(agent => {
      gfx.beginFill(0xFFFF00);
      gfx.drawRect(
        agent.x * CELL_SIZE,
        agent.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
  }



  setup();
})();
