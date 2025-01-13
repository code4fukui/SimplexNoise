export class PerlinNoise1D {
  constructor() {
    this.permutation = [];
    for (let i = 0; i < 256; i++) {
      this.permutation.push(i);
    }
    this.permutation.sort(() => Math.random() - 0.5);
    this.permutation = this.permutation.concat(this.permutation);
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(a, b, t) {
    return a + t * (b - a);
  }

  grad(hash, x) {
    return (hash & 1) === 0 ? x : -x;
  }

  noise(x) {
    const X = Math.floor(x) & 255;
    x -= Math.floor(x);
    const u = this.fade(x);

    const a = this.permutation[X];
    const b = this.permutation[X + 1];

    return this.lerp(this.grad(a, x), this.grad(b, x - 1), u);
  }
}
