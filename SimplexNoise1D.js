import { createNoise2D } from "./simplex-noise.js";

export class SimplexNoise1D {
  constructor() {
    const noise2d = createNoise2D();
    this.noise = (x) => {
      return noise2d(x, 0);
    };
  }
}
