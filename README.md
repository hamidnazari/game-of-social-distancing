# Game of Social Distancing

> This is a rough alpha release.

This is a little fun simulation inspired by [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
  
Rules are simple:
1. The world is a grid of X * Y cells;
1. An agent (sim person) can appear (blue) in a cell based on "Density Rate";
1. That agent has a percentage chance of being infected (yellow), "Initial Infected Rate";
1. Each agent can move in 9 possible directions, picked at random;
1. If two or more agents end up on the same cell, that's a clos contact event;
1. If any agents in close contact is infected, the other agents in the same group get infected;
1. Agents die (black) after a certain number of days being infected;
1. Dead agents are buried (disappear) after a certain number of days after dying.

Contributions are most welcome. Have a look at `TODO.txt` for ideas.
