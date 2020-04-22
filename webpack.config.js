const path = require('path');

module.exports = {
  mode: 'production',
  entry: [
      './src/ui.js',
      './src/rng.js',
      './src/sim.js',
      './src/agent.js',
      './src/game.js',
  ],
  output: {
    filename: 'game.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
