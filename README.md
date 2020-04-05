# Game of Social Distancing

> This is a rough alpha release.

This is a little cellular automaton inspired by [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). Here's the [Demo](http://game-of-social-distancing.s3-website-ap-southeast-2.amazonaws.com/).
  
Rules are simple:
1. The world is a grid of X * Y cells;
1. An agent (sim person) can appear (blue) in a cell based on _"Density Rate"_;
1. That agent has a percentage chance of being infected (yellow), _"Initial Infected Rate"_;
1. Each agent can move in 9 possible directions picked at random;
1. If two or more agents end up on the same cell, that's a close contact event;
1. If any agents in close contact is infected, the other healthy agents in the same group may get infected depending on _"Transmission Rate"_;
1. After the _"Infection Period"_ is over, agents either recover (blue) or die (black);
1. Dead agents are buried (light grey) after a certain number of days after dying.
1. Simulation stops when number of infected and recently died agents reach zero, or when the maximum number of days (currently set to 3 years) is reached.

Contributions are most welcome. Have a look at `TODO.txt` for ideas.
