# `createVNode` optimization benchmark

> A  benchmark repository aiming to optimize Preact's [createVNode](https://github.com/preactjs/preact/blob/main/jsx-runtime/src/index.js#L27) function.

## Motivation

`for...in` is used to iterate over the enumerable properties of an object, which includes properties from the prototype chain. Due to this behavior, I believe there might be potential performance issues. Therefore, we have adopted a more performant approach and provided Benchmark validation.

## ESBench

It's unfortunate that we cannot create a new Benchmark on https://esbench.com/ to share with others (maybe the server is down). Please open this Benchmark https://esbench.com/bench/5f6b54a0b4632100a7dcd2b3 created by [@developit](https://github.com/developit) and manually add additional Benchmark cases for execution.

![](https://github.com/ulivz/optimize-createvnode-benchmark/raw/master/public/esbench-result.png)

## Local Machine

`MacBook Pro (16-inch, 2021)`

### Node.js

> v18.17.0
  
```
unguarded x 3,865,669 ops/sec ±1.12% (96 runs sampled)
guarded x 3,781,243 ops/sec ±0.43% (96 runs sampled)
type check x 4,037,347 ops/sec ±0.62% (92 runs sampled)
type check + guarded x 3,848,294 ops/sec ±1.79% (95 runs sampled)
type check + guarded (opt) x 3,969,093 ops/sec ±0.18% (97 runs sampled)
for of object keys x 2,980,044 ops/sec ±2.44% (94 runs sampled)
for loop object keys x 11,556,313 ops/sec ±0.20% (96 runs sampled)
Fastest is for loop object keys
```

### Chrome
  
> `Version 118.0.5993.88 (Official Build) (arm64)`

```
unguarded x 4,476,465 ops/sec ±0.24% (67 runs sampled)
guarded x 4,389,654 ops/sec ±0.34% (67 runs sampled)
type check x 4,610,773 ops/sec ±0.34% (69 runs sampled)
type check + guarded x 4,453,571 ops/sec ±0.43% (67 runs sampled)
type check + guarded (opt) x 4,499,549 ops/sec ±0.15% (68 runs sampled)
for of object keys x 3,450,670 ops/sec ±0.21% (69 runs sampled)
for loop object keys x 12,445,619 ops/sec ±0.31% (69 runs sampled)
Fastest is for loop object keys
```


## Setup

```bash
pnpm i
# Node.js
node benchmark.js
# Chrome
open index.html
```