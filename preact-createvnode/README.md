# `createVNode` optimization benchmark

> A  benchmark repository aiming to optimize Preact's [createVNode](https://github.com/preactjs/preact/blob/main/jsx-runtime/src/index.js#L27) function.

<!-- ## Motivation

`for...in` is used to iterate over the enumerable properties of an object, which includes properties from the prototype chain. Due to this behavior, I believe there might be potential performance issues. Therefore, we have adopted a more performant approach and provided Benchmark validation. -->

## ESBench

It's unfortunate that we cannot create a new Benchmark on https://esbench.com/ to share with others (maybe the server is down). Please open this Benchmark https://esbench.com/bench/5f6b54a0b4632100a7dcd2b3 created by [@developit](https://github.com/developit) and manually add additional Benchmark cases for execution.

## Local Machine

`MacBook Pro (16-inch, 2021)`

### Node.js

> v18.17.0
  
```
unguarded x 3,889,026 ops/sec ±2.93% (65 runs sampled)
guarded x 4,043,904 ops/sec ±2.29% (66 runs sampled)
type check x 4,326,838 ops/sec ±0.74% (67 runs sampled)
type check + guarded x 4,291,581 ops/sec ±0.16% (69 runs sampled)
type check + guarded (opt) x 4,282,947 ops/sec ±0.22% (69 runs sampled)
for of object keys x 3,272,962 ops/sec ±1.49% (67 runs sampled)
for of object entries x 2,521,168 ops/sec ±0.76% (68 runs sampled)
for loop object keys x 3,459,585 ops/sec ±1.00% (66 runs sampled)
for loop object entries x 3,210,227 ops/sec ±0.91% (68 runs sampled)
Fastest is type check
```

### Chrome
  
> `Version 118.0.5993.88 (Official Build) (arm64)`

```
unguarded x 3,805,095 ops/sec ±0.47% (96 runs sampled)
guarded x 3,624,805 ops/sec ±1.42% (96 runs sampled)
type check x 3,875,439 ops/sec ±0.69% (94 runs sampled)
type check + guarded x 3,838,231 ops/sec ±0.49% (97 runs sampled)
type check + guarded (opt) x 3,781,117 ops/sec ±1.10% (98 runs sampled)
for of object keys x 2,985,459 ops/sec ±0.67% (97 runs sampled)
for of object entries x 2,059,486 ops/sec ±0.20% (96 runs sampled)
for loop object keys x 3,216,054 ops/sec ±0.33% (94 runs sampled)
for loop object entries x 2,974,818 ops/sec ±0.26% (94 runs sampled)
Fastest is type check
```

## Setup

```bash
pnpm i
# Node.js
node benchmark.js
# Chrome
open index.html
```