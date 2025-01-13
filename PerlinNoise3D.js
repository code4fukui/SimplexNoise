export class PerlinNoise3D {
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

  grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);

    const a = this.permutation[X] + Y;
    const aa = this.permutation[a] + Z;
    const ab = this.permutation[a + 1] + Z;
    const b = this.permutation[X + 1] + Y;
    const ba = this.permutation[b] + Z;
    const bb = this.permutation[b + 1] + Z;

    return this.lerp(
      this.lerp(
        this.lerp(this.grad(this.permutation[aa], x, y, z), this.grad(this.permutation[ba], x - 1, y, z), u),
        this.lerp(this.grad(this.permutation[ab], x, y - 1, z), this.grad(this.permutation[bb], x - 1, y - 1, z), u),
        v
      ),
      this.lerp(
        this.lerp(this.grad(this.permutation[aa + 1], x, y, z - 1), this.grad(this.permutation[ba + 1], x - 1, y, z - 1), u),
        this.lerp(this.grad(this.permutation[ab + 1], x, y - 1, z - 1), this.grad(this.permutation[bb + 1], x - 1, y - 1, z - 1), u),
        v
      ),
      w
    );
  }
}
