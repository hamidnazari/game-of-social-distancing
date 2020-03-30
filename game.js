(function() {
  const ROWS = 80;
  const COLS = 128;
  const CELL_SIZE = 10;
  const SPEED = 1000;

  let speedModifier = 1;
  let timeout = SPEED / speedModifier;
  let pixi, gfx, sim;

  const tick = () => {
    sim.update();
    draw();
  }

  const setup = () => {
    sim = new Sim(COLS, ROWS);
    setupCanvas();
    window.setInterval(tick, timeout);
    tick();
  }

  const setupCanvas = () => {
    pixi = new PIXI.Application({
      width: COLS * CELL_SIZE,
      height: ROWS * CELL_SIZE,
      antialias: true,
      // backgroundColor: 0xE6E6EA,
      backgroundColor: 0x777777
    });

    // TODO: move to their own class
    const grid = new PIXI.Container();
    const agents = new PIXI.Container();
    pixi.stage.addChild(grid);
    pixi.stage.addChild(agents);

    gfx = new PIXI.Graphics();
    pixi.stage.addChild(gfx);

    document.body.appendChild(pixi.view);
  }

  const drawGrid = () => {
    // gfx.lineStyle(1, 0xF4F4F8);

    for (let i = 1; i < COLS; ++i) {
      gfx.moveTo(i*CELL_SIZE, 0)
         .lineTo(i*CELL_SIZE, ROWS*CELL_SIZE)
    }

    for (let j = 1; j < ROWS; ++j) {
      gfx.moveTo(0, j*CELL_SIZE)
         .lineTo(COLS*CELL_SIZE, j*CELL_SIZE)
    }
  }

  const drawAgents = () => {
    gfx.lineStyle(0);

    sim.agents.forEach(agent => {
      let color = agent.isSick() ? 0xFCA903 : 0x0392CF;
      gfx.beginFill(color)
         .drawCircle(
           (agent.x + .5) * CELL_SIZE,
           (agent.y + .5) * CELL_SIZE,
           CELL_SIZE / 3,
      );
    });
    gfx.endFill();
  }

  const draw = () => {
    gfx.clear();
    drawGrid();
    drawAgents();

    // Workaround: https://github.com/pixijs/pixi.js/wiki/v5-Hacks#removing-65k-vertices-limitation
    gfx.geometry.updateBatches();
    gfx.geometry._indexBuffer.update(new Uint32Array(gfx.geometry.indices));
  }

  setup();
})();
