const RNG = (() => { // eslint-disable-line no-unused-vars
  let _rng;

  return {
    seed: (seed = 0) => {
      _rng = new Math.seedrandom(seed); // eslint-disable-line new-cap
    },
    random: () => _rng(),
    randNumber(min = 0, max = 100) {
      return this.random() * (max - min) + min;
    },
    randInteger(min = 0, max = 100) {
      const lo = Math.ceil(min);
      const hi = Math.floor(max);
      return Math.floor(this.random() * (hi - lo)) + lo;
    },
    randFalse(weight = 0.5) {
      return this.random() >= weight;
    },
    randTrue(weight = 0.5) {
      return this.random() < weight;
    },
  };
})();

export default RNG;
