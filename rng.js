const RNG = (() => { // eslint-disable-line no-unused-vars
  let _rng;

  const _seed = (seed) => {
    // _rng = Math.random; // Pseudo Random
    _rng = new Math.seedrandom(seed); // eslint-disable-line new-cap
  };

  return {
    seed: _seed,
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
