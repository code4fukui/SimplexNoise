import { createNoise2D } from "./simplex-noise.js";

export class SimplexNoise2D {
  constructor() {
    this.noise = createNoise2D();
  }
}
