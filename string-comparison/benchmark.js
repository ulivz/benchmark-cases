/**
 * Setup start
 */
function equal(type) {
  return type == 'ref';
}

function strictEqual(type) {
  return type === 'ref';
}

function regEqual(type) {
  return /^ref$/.test(type);
}

const CASES = [
  "ref",
  "",
  undefined,
  0,
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
    console.log(`run test: ${fn.name}`);
    assert.strictEqual(fn('ref'), true);
    assert.strictEqual(fn('ref1'), false);
    assert.strictEqual(fn('1ref'), false);
    assert.strictEqual(fn(0), false);
  }
  runTest(equal);
  runTest(strictEqual);
  runTest(regEqual);
}

const suite = new Benchmark.Suite();

// add tests
suite
  .add("equal", function () {
    run(equal);
  })
  .add("strictEqual", function () {
    run(strictEqual);
  })
  .add("regEqual", function () {
    run(regEqual);
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
