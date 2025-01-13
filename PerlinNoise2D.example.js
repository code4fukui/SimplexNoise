import { PerlinNoise2D } from "./PerlinNoise2D.js";

const noise = new PerlinNoise2D();
for (let i = 0; i < 10; i += 0.1) {
  console.log(noise.noise(0.1, i));
}
