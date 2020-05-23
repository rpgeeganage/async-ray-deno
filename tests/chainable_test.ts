import { Chain } from "../mod.ts";
import { AsyncArray } from "../async_array.ts";
import { Chainable } from "../chainable.ts";
import {
  assertArrayContains,
  assertEquals,
  assertThrowsAsync,
} from "./test_deps.ts";

Deno.test("Chainable: should handle an empty array", async function (): Promise<
  void
> {
  const op = await Chain([])
    .aMap(async (e) => Promise.resolve(e * 10))
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 30))
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 600))
    .process();

  assertEquals(op instanceof Array, true);
  assertEquals(op instanceof AsyncArray, true);
});

Deno.test("Chainable: should return AsyncRay instance if returned value is an array", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .process();

  assertEquals(op instanceof Array, true);
  assertEquals(op instanceof AsyncArray, true);
  assertArrayContains(op, [10, 20, 30, 40]);
});

Deno.test("Chainable: should process multiple async functions", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 30))
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 600))
    .process();

  assertEquals(op instanceof Array, true);
  assertEquals(op instanceof AsyncArray, true);
  assertArrayContains(op, [700, 800, 900, 1000]);
});

Deno.test("Chainable: should throw and halt execution in case of error during the process", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4];

  await assertThrowsAsync(
    (): Promise<void> => {
      return Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 30))
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 30))
        .aFilter(async (e) => {
          throw new Error("This is an error");
        })
        .aMap(async (e) => Promise.resolve(e * 10))
        .process();
    },
    Error,
    "This is an error",
  );
});

Deno.test("Chainable: should execute chaining process, if none chainable method was added", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4, 5, 6, 7];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 30))
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 400))
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 5000))
    .aSome(async (e) => Promise.resolve(e > 5000));

  assertEquals(op, true);
});

Deno.test("Chainable methods: aFilter", async function (): Promise<void> {
  const input = [100, 200, 300];

  const op = await Chain(input)
    .aFilter(async (e) => Promise.resolve(e > 100))
    .aFilter(async (e) => Promise.resolve(e > 200))
    .process();

  assertEquals(op instanceof Array, true);
  assertEquals(op instanceof AsyncArray, true);
  assertArrayContains(op, [300]);
});

Deno.test("Chainable methods: aFlatMap", async function (): Promise<void> {
  const input = [1, 2, 3, 4, 5];

  const op = await Chain(input)
    .aFlatMap(async (e) => Promise.resolve([e, e * 2]))
    .aMap(async (e) => Promise.resolve(e * 2))
    .process();

  assertEquals(op instanceof Array, true);
  assertEquals(op instanceof AsyncArray, true);
  assertArrayContains(op, [2, 4, 4, 8, 6, 12, 8, 16, 10, 20]);
});

Deno.test("Chainable methods: aMap", async function (): Promise<void> {
  const input = [1, 2, 3];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aMap(async (e) => Promise.resolve(e * 10))
    .process();

  assertEquals(op instanceof Array, true);
  assertEquals(op instanceof AsyncArray, true);
  assertArrayContains(op, [100, 200, 300]);
});

Deno.test("Chainable methods: Chainable methods has to call process methods to get the value", async function (): Promise<
  void
> {
  const input = [1, 2, 3];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 10));

  assertEquals(op instanceof Chainable, true);
});

Deno.test("Methods: can be used without any chainable method", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4];

  const op = await Chain(input).aSome(async (e) => Promise.resolve(e > 1));

  assertEquals(op, true);
});

Deno.test("Methods: aEvery", async function (): Promise<void> {
  const input = [1, 2, 3, 4];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 20))
    .aEvery(async (e) => Promise.resolve(e > 10));

  assertEquals(op, true);
});

Deno.test("Methods: aFind", async function (): Promise<void> {
  const input = [1, 2, 3, 4];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 20))
    .aFind(async (e) => Promise.resolve(e === 30));

  assertEquals(op, 30);
});

Deno.test("Methods: aFindIndex", async function (): Promise<void> {
  const input = [1, 2, 3, 4, 5];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 20))
    .aFindIndex(async (e) => Promise.resolve(e === 40));

  assertEquals(op, 1);
});

Deno.test("Methods: aForEach", async function (): Promise<void> {
  const input = [1, 2, 3, 4, 5];
  const op: number[] = [];

  await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 20))
    .aForEach(async (e) => {
      const element = await Promise.resolve(e);
      op.push(element);
    });

  assertArrayContains(op, [30, 40, 50]);
});

Deno.test("Methods: aReduce with initial value", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4, 5];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 10))
    .aReduce(async (acc, i) => {
      return acc + (await Promise.resolve(i));
    }, 10);

  assertEquals(op, 150);
});

Deno.test("Methods: aReduce without initial value", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4, 5];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 10))
    .aReduce(async (acc, i) => {
      if (!acc) {
        return Promise.resolve(i);
      }
      return (acc as number) + (await Promise.resolve(i));
    });

  assertEquals(op, 140);
});

Deno.test("Methods: aReduceRight with initial value", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4, 5];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 10))
    .aReduceRight(async (acc, i) => {
      return acc + (await Promise.resolve(i));
    }, 10);

  assertEquals(op, 150);
});

Deno.test("Methods: aReduceRight without initial value", async function (): Promise<
  void
> {
  const input = [1, 2, 3, 4, 5];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 10))
    .aReduceRight(async (acc, i) => {
      if (!acc) {
        return Promise.resolve(i);
      }
      return (acc as number) + (await Promise.resolve(i));
    });

  assertEquals(op, 140);
});

Deno.test("Methods: aSome", async function (): Promise<void> {
  const input = [1, 2, 3, 4];

  const op = await Chain(input)
    .aMap(async (e) => Promise.resolve(e * 10))
    .aFilter(async (e) => Promise.resolve(e > 20))
    .aSome(async (e) => Promise.resolve(e > 10));

  assertEquals(op, true);
});
