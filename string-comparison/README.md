# String Comparison Benchmark

### Node.js

> v18.17.0
  
```
equal x 39,357,860 ops/sec ±0.92% (99 runs sampled)
strictEqual x 970,656,452 ops/sec ±0.16% (96 runs sampled)
regEqual x 14,017,703 ops/sec ±2.23% (89 runs sampled)
Fastest is strictEqual
```

### Chrome
  
> `Version 118.0.5993.88 (Official Build) (arm64)`

```
equal x 53,616,632 ops/sec ±0.72% (61 runs sampled)
strictEqual x 984,565,093 ops/sec ±0.62% (67 runs sampled)
regEqual x 15,377,378 ops/sec ±1.81% (66 runs sampled)
benchmark.js:67 Fastest is strictEqual
```

## Setup

```bash
pnpm i
# Node.js
node compare-string/benchmark.js
# Chrome
open index.html
```