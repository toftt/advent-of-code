import { Counter } from "~utils/Counter";

type Direction = "left" | "right" | "down" | "up";

interface Position {
  x: number;
  y: number;
}

export class InfiniteGrid {
  private readonly store: Counter<string> = new Counter();
  private position = { x: 0, y: 0 };

  public entries() {
    return this.store.entries();
  }

  public addVisit(position: Position) {
    this.store.add(`x${position.x}y${position.y}`);
  }

  public walk(direction: Direction) {
    switch (direction) {
      case "left": {
        this.position.x -= 1;
        break;
      }
      case "right": {
        this.position.x += 1;
        break;
      }
      case "up": {
        this.position.y += 1;
        break;
      }
      case "down": {
        this.position.y -= 1;
        break;
      }
    }
  }
}

export class GridActor {
  constructor(private grid: InfiniteGrid, private position: Position) {}

  public walk(direction: Direction) {
    switch (direction) {
      case "left": {
        this.position.x -= 1;
        break;
      }
      case "right": {
        this.position.x += 1;
        break;
      }
      case "up": {
        this.position.y += 1;
        break;
      }
      case "down": {
        this.position.y -= 1;
        break;
      }
    }

    this.grid.addVisit(this.position);
  }
}
