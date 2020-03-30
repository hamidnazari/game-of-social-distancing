var RNG = (function() {
  const SEED = 0;

  const rng = new Math.seedrandom(SEED);

  return {
    random: rng,
    randNumber: function(min, max) {
      return rng() * (max - min) + min;
    },
    randInteger: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(rng() * (max - min)) + min;
    },
    randFalse: function(weight=0.5) {
      return rng() >= weight;
    },
    randTrue: function(weight=0.5) {
      return rng() < weight;
    }
  }
})();
