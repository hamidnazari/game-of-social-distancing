const RNG = (() => { // eslint-disable-line no-unused-vars
  const SEED = 'CoViD-19';

  // const _rng = Math.random; // Pseudo Random
  const _rng = new Math.seedrandom(SEED); // eslint-disable-line new-cap

  return {
    random: _rng,
    randNumber(min, max) {
      return _rng() * (max - min) + min;
    },
    randInteger(min, max) {
      const lo = Math.ceil(min);
      const hi = Math.floor(max);
      return Math.floor(_rng() * (hi - lo)) + lo;
    },
    randFalse(weight = 0.5) {
      return _rng() >= weight;
    },
    randTrue(weight = 0.5) {
      return _rng() < weight;
    },
  };
})();
