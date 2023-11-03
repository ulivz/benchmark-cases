/**
 * Setup start
 */
function loop(type) {
  let props = {},
    d;
  if (type) {
    for (let i in (d = type.defaultProps))
      if (props[i] === undefined) props[i] = d[i];
  }
  return props;
}

function guardedLoop(type) {
  let props = {};
  let d = type && type.defaultProps;
  if (d) {
    for (let i in d) if (props[i] === undefined) props[i] = d[i];
  }
  return props;
}

function typeLoop(type) {
  let props = {},
    d;
  if (typeof type === "function") {
    for (let i in (d = type.defaultProps))
      if (props[i] === undefined) props[i] = d[i];
  }
  return props;
}

function typeGuardedLoop(type) {
  let props = {},
    d;
  if (typeof type === "function" && (d = type.defaultProps)) {
    for (let i in d) if (props[i] === undefined) props[i] = d[i];
  }
  return props;
}

function typeGuardedLoopOpt(type) {
  let props = {},
    d,
    i;
  if (typeof type === "function" && (d = type.defaultProps)) {
    for (i in d) if (props[i] === undefined) props[i] = d[i];
  }
  return props;
}

function forOfObjectKeys(type) {
  let props = {},
    d;

  if (typeof type === "function" && (d = type.defaultProps)) {
    for (const i of Object.keys(d)) if (props[i] === undefined) props[i] = d[i];
  }

  return props;
}

function forOfObjectEntries(type) {
  let props = {},
    d;

  if (typeof type === "function" && (d = type.defaultProps)) {
    const entries = Object.entries(d);
    for (entry of entries)
      if (props[entry[0]] === undefined) props[entry[0]] = entry[1];
  }

  return props;
}

function forLoopObjectKeys(type) {
  let props = {},
    d,
    i;

  if (typeof type === "function" && (d = type.defaultProps)) {
    const keys = Object.keys(d);
    for (i = 0; i < keys.length; i++)
      if (props[keys[i]] === undefined) props[keys[i]] = d[keys[i]];
  }

  return props;
}

function forLoopObjectEntries(type) {
  let props = {},
    d,
    i;

  if (typeof type === "function" && (d = type.defaultProps)) {
    const entries = Object.entries(d);
    for (i = 0; i < entries.length; i++)
      if (props[entries[i][0]] === undefined) props[entries[i][0]] = entries[i][1];
  }

  return props;
}

function make(defaults) {
  function Foo() { }
  if (defaults !== false) Foo.defaultProps = defaults;
  return Foo;
}

const CASES = [
  make({}),
  "div",
  make({ a: 1 }),
  make({ x: 2 }),
  make({ a: "3", b: 1 }),
  make({ b: null }),
  make({ c: "hi" }),
  "span",
  make({ c: undefined, d: 4.1 }),
  make(null),
  make(undefined),
  make(false),
  function Bar() { },
  "p",
];

const run = Function(
  "CASES",
  "fn",
  CASES.map((c, i) => `fn(CASES[${i}]);`).join("\n")
).bind(null, CASES);
/**
 * Setup end
 */

const isNode = typeof window === "undefined";
const Benchmark = isNode ? require("benchmark") : window.Benchmark;

if (isNode) {
  const assert = require("assert");
  function runTest(fn) {
    function  TypeWithDefaultProps() {

    }
    TypeWithDefaultProps.defaultProps = {
      color: 'red',
      size: 'large'
    }
  
    const result = fn(TypeWithDefaultProps);
    console.log(`run test: ${fn.name}`);
    assert.strictEqual(result.color, 'red');
    assert.strictEqual(result.size, 'large');
  }
  runTest(loop);
  runTest(guardedLoop);
  runTest(typeLoop);
  runTest(typeGuardedLoop);
  runTest(typeGuardedLoopOpt);
  runTest(forOfObjectKeys);
  runTest(forOfObjectEntries);
  runTest(forLoopObjectKeys);
  runTest(forLoopObjectEntries);
}

const suite = new Benchmark.Suite();

// add tests
suite
  .add("unguarded", function () {
    run(loop);
  })
  .add("guarded", function () {
    run(guardedLoop);
  })
  .add("type check", function () {
    run(typeLoop);
  })
  .add("type check + guarded", function () {
    run(typeGuardedLoop);
  })
  .add("type check + guarded (opt)", function () {
    run(typeGuardedLoopOpt);
  })
  .add("for of object keys", function () {
    run(forOfObjectKeys);
  })
  .add("for of object entries", function () {
    run(forOfObjectEntries);
  })
  .add("for loop object keys", function () {
    run(forLoopObjectKeys);
  })
  .add("for loop object entries", function () {
    run(forLoopObjectEntries);
  })
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
