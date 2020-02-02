import { configure, observable, action, computed } from 'mobx';

import { PacMan } from './PacMan';
import { Ghost } from './Ghost';
import { TileId, getPillsMatrix } from './MazeData';
import { GameInterface } from './GameInterface';
import { SPEED } from '../components/Types';
import { screenFromTile } from './Coordinates';

configure({ enforceActions: 'observed' });

const makeGhosts = (game: GameInterface): Ghost[] => {
  const ghosts: Ghost[] = [
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
  ];

  ghosts[0].ghostNumber = 0;
  ghosts[0].color = 'red';
  ghosts[0].vx = SPEED;
  ghosts[0].vy = 0;
  [ghosts[0].minX, ghosts[0].minY] = screenFromTile(1, 1);
  [ghosts[0].maxX, ghosts[0].maxY] = screenFromTile(26, 30);
  [ghosts[0].x, ghosts[0].y] = screenFromTile(1, 29);

  ghosts[1].ghostNumber = 1;
  ghosts[1].color = 'pink';
  ghosts[1].vx = SPEED;
  ghosts[1].vy = 0;
  [ghosts[1].minX, ghosts[1].minY] = screenFromTile(15, 1);
  [ghosts[1].maxX, ghosts[1].maxY] = screenFromTile(26, 29);
  [ghosts[1].x, ghosts[1].y] = screenFromTile(31, 20);

  ghosts[2].ghostNumber = 2;
  ghosts[2].color = 'cyan';
  ghosts[2].vx = 0;
  ghosts[2].vy = SPEED;
  [ghosts[2].minX, ghosts[2].minY] = screenFromTile(1, 17);
  [ghosts[2].maxX, ghosts[2].maxY] = screenFromTile(30, 26);
  [ghosts[2].x, ghosts[2].y] = screenFromTile(21, 23);

  ghosts[3].ghostNumber = 3;
  ghosts[3].color = 'orange';
  [ghosts[3].minX, ghosts[3].minY] = screenFromTile(1, 1);
  [ghosts[3].maxX, ghosts[3].maxY] = screenFromTile(26, 30);
  [ghosts[3].x, ghosts[3].y] = screenFromTile(7, 5);
  ghosts[3].vx = SPEED;
  ghosts[3].vy = 0;
  return ghosts;
};

export class GameStore implements GameInterface {
  constructor() {
    this.ghosts = makeGhosts(this);
  }
  @observable
  timestamp = 0;

  @observable
  previousTimestamp = 0;

  @computed
  get timeBetweenTicks() {
    return this.timestamp - this.previousTimestamp;
  }

  @observable
  gamePaused = false;

  @action.bound
  toggleGamePaused() {
    this.gamePaused = !this.gamePaused;
  }

  @observable
  gameRunning = true;

  ghosts: Ghost[];

  pacMan = new PacMan();

  @observable
  score = 0;

  @observable
  pills: TileId[][] = getPillsMatrix();

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pacMan.setPressedKey(pressedKey);
  }

  @action.bound
  stopGame() {
    this.gameRunning = false;
  }

  @action.bound
  killPacMan() {
    this.pacMan.setState('dead');
    this.pacMan.diedAtTimestamp = this.timestamp;
  }

  @action.bound
  revivePacMan() {
    this.pacMan.setState('eating');
  }
}
