import { createNoise3D } from "./simplex-noise.js";

export class SimplexNoise3D {
  constructor() {
    this.noise = createNoise3D();
  }
}
