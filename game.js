(() => {
  const ROWS = 80;
  const COLS = 128;
  const CELL_SIZE = 10;
  const SPEED = 1000;

  const speedModifier = 100;
  const timeout = SPEED / speedModifier;
  let gfx;
  let sim;

  const setupCanvas = () => {
    const pixi = new PIXI.Application({
      width: COLS * CELL_SIZE,
      height: ROWS * CELL_SIZE,
      antialias: true,
      backgroundColor: 0xE6E6EA,
    });

    gfx = new PIXI.Graphics();
    pixi.stage.addChild(gfx);

    document.getElementById('pixi').appendChild(pixi.view);
  };

  const drawGrid = () => {
    gfx.lineStyle(1, 0xF4F4F8);

    for (let i = 1; i < COLS; ++i) {
      gfx.moveTo(i * CELL_SIZE, 0)
        .lineTo(i * CELL_SIZE, ROWS * CELL_SIZE);
    }

    for (let j = 1; j < ROWS; ++j) {
      gfx.moveTo(0, j * CELL_SIZE)
        .lineTo(COLS * CELL_SIZE, j * CELL_SIZE);
    }
  };

  const getAgentColour = (agent) => {
    let colour = 0x0392CF;

    if (agent.isInfected()) {
      colour = 0xFCA903;
    } else if (agent.isDead()) {
      colour = 0x000000;
    }

    return colour;
  };

  const drawAgents = () => {
    gfx.lineStyle(0);

    sim.agents.forEach((agent) => {
      if (agent.isBuried()) return;

      gfx.beginFill(getAgentColour(agent))
        .drawCircle(
          (agent.x + 0.5) * CELL_SIZE,
          (agent.y + 0.5) * CELL_SIZE,
          CELL_SIZE / 3,
        );
    });
    gfx.endFill();
  };

  const draw = () => {
    gfx.clear();
    drawGrid();
    drawAgents();

    // Workaround: https://github.com/pixijs/pixi.js/wiki/v5-Hacks#removing-65k-vertices-limitation
    gfx.geometry.updateBatches();
    gfx.geometry._indexBuffer.update(new Uint32Array(gfx.geometry.indices));
  };

  const render = () => {
    Metrics.print(sim);
    draw();
  };

  const tick = () => {
    sim.update();
    render();
  };

  const setup = () => {
    sim = new Sim(COLS, ROWS);
    setupCanvas();
    window.setInterval(tick, timeout);
    render();
  };

  setup();
})();
