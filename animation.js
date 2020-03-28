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
    sim = new Sim(ROWS, COLS, 0.6);
    console.log(sim.agents.length);

    window.setInterval(tick, timeout);
    tick();
  }

  const setupCanvas = () => {
    pixi = new PIXI.Application({
      width: COLS * CELL_SIZE,
      height: ROWS * CELL_SIZE,
      backgroundColor: 0xE6E6EA
    });

    // TODO: mvoe to their own class
    const grid = new PIXI.Container();
    const agents = new PIXI.Container();
    pixi.stage.addChild(grid);
    pixi.stage.addChild(agents);

    gfx = new PIXI.Graphics();
    pixi.stage.addChild(gfx);

    document.body.appendChild(pixi.view);
  }

  const drawGrid = () => {
    gfx.lineStyle(1, 0xF4F4F8);

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
    sim.agents.forEach(agent => {
      gfx.beginFill(0x0392CF);
      gfx.drawRect(
        agent.x * CELL_SIZE + 2,
        agent.y * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
      );
      gfx.endFill();
    });
  }

  const draw = () => {
    gfx.clear();
    drawGrid();
    drawAgents();
  }

  setup();
})();
