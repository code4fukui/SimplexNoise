import { SimplexNoise2D } from "./SimplexNoise2D.js";

const noise = new SimplexNoise2D();
for (let i = 0; i < 10; i += 0.1) {
  console.log(noise.noise(0.1, i));
}
