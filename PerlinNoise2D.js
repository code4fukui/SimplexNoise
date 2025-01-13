export class PerlinNoise2D {
  constructor() {
    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];
    this.permutation = [];
    this.p = [];
    this.init();
  }

  init() {
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = Math.floor(Math.random() * 256);
    }
    for (let i = 0; i < 512; i++) {
      this.p[i] = this.permutation[i % 256];
    }
  }

  dot(g, x, y) {
    return g[0] * x + g[1] * y;
  }

  noise(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const g00 = this.grad3[this.p[X + this.p[Y]] % 12];
    const g01 = this.grad3[this.p[X + this.p[Y + 1]] % 12];
    const g10 = this.grad3[this.p[X + 1 + this.p[Y]] % 12];
    const g11 = this.grad3[this.p[X + 1 + this.p[Y + 1]] % 12];

    const n00 = this.dot(g00, x, y);
    const n01 = this.dot(g01, x, y - 1);
    const n10 = this.dot(g10, x - 1, y);
    const n11 = this.dot(g11, x - 1, y - 1);

    const nx0 = this.lerp(n00, n10, u);
    const nx1 = this.lerp(n01, n11, u);

    return this.lerp(nx0, nx1, v);
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
}
