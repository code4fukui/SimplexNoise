//const url = "https://cdn.skypack.dev/simplex-noise@4.0.0";
//const fn = "simplex-noise@4.0.0.js";

const url = "https://cdn.skypack.dev/-/simplex-noise@v4.0.0-tpJe0v0AiOjIRwV6l2dw/dist=es2019,mode=imports/optimized/simplex-noise.js";
const fn = "simplex-noise.js";

const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
await Deno.writeFile(fn, bin);
