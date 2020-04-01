const UI = (() => { // eslint-disable-line no-unused-vars
  const CELL_SIZE = 8;
  const SPEED = 1000;

  const _speedModifier = 2;
  const _timeout = SPEED / _speedModifier;

  let _sim;
  let _gfx;
  let _timer;

  const _setTimer = (tick) => {
    if (_timer) {
      window.clearInterval(_timer);
    }
    _timer = window.setInterval(tick, _timeout);
  };

  const _setupCanvas = () => {
    const pixi = new PIXI.Application({
      width: _sim.cols * CELL_SIZE,
      height: _sim.rows * CELL_SIZE,
      antialias: true,
      backgroundColor: 0xE6E6EA,
    });
    document.getElementById('pixi').appendChild(pixi.view);
    _gfx = new PIXI.Graphics();
    pixi.stage.addChild(_gfx);
  };

  const _setup = (sim, gameTick, restartHandler) => {
    _sim = sim;
    _setupCanvas();
    document.getElementById('restart').onclick = restartHandler;
    _setTimer(gameTick);
  };

  const _setSim = (sim) => {
    _sim = sim;
  };

  const _setValue = function _setValue(id, value) {
    document.getElementById(id).innerText = value;
  };

  const _printMetrics = () => {
    _setValue('people_count', _sim.agentCount);
    _setValue('alive_count', _sim.agentAliveCount);
    _setValue('healthy_count', _sim.agentHealthyCount);
    _setValue('infected_count', _sim.agentInfectedCount);
    _setValue('dead_count', _sim.agentDeadCount);
    _setValue('buried_count', _sim.agentBuriedCount);
    _setValue('day_number', _sim.currentStep + 1);
  };

  const _getAgentColour = (agent) => {
    let colour = 0x0392CF;

    if (agent.isInfected()) {
      colour = 0xFCA903;
    } else if (agent.isDead()) {
      colour = 0x000000;
    }

    return colour;
  };

  const _drawAgents = () => {
    _gfx.lineStyle(0);

    _sim.agents.forEach((agent) => {
      if (agent.isBuried()) return;

      _gfx.beginFill(_getAgentColour(agent))
        .drawCircle(
          (agent.x + 0.5) * CELL_SIZE,
          (agent.y + 0.5) * CELL_SIZE,
          CELL_SIZE / 3,
        );
    });
    _gfx.endFill();
  };

  const _drawGrid = () => {
    _gfx.lineStyle(1, 0xF4F4F8);

    for (let i = 1; i < _sim.cols; ++i) {
      _gfx.moveTo(i * CELL_SIZE, 0)
        .lineTo(i * CELL_SIZE, _sim.rows * CELL_SIZE);
    }

    for (let j = 1; j < _sim.rows; ++j) {
      _gfx.moveTo(0, j * CELL_SIZE)
        .lineTo(_sim.cols * CELL_SIZE, j * CELL_SIZE);
    }
  };

  const _draw = () => {
    _gfx.clear();
    _drawGrid();
    _drawAgents();

    // Workaround: https://github.com/pixijs/pixi.js/wiki/v5-Hacks#removing-65k-vertices-limitation
    _gfx.geometry.updateBatches();
    _gfx.geometry._indexBuffer.update(new Uint32Array(_gfx.geometry.indices));
  };

  const _render = () => {
    _printMetrics();
    _draw();
  };

  return {
    setup: _setup,
    render: _render,
    setSim: _setSim,
  };
})();
