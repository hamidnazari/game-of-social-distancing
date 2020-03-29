var RNG = (function() {
  const SEED = 0;

  let rng = new Math.seedrandom(SEED);

  return {
    random: rng,
    randNumber: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    randInteger: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    randFalse: function(weight=0.5) {
      return rng() >= weight;
    },
    randTrue: function(weight=0.5) {
      return rng() < weight;
    }
  }
})();
