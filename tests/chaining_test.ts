import { AsyncArray } from "../async_array.ts";
import { AsyncRay } from "../mod.ts";
import {
  assertArrayContains,
  assertEquals,
} from "./test_deps.ts";

const inputArray = [1, 2, 3, 4];

async function dummyAsync(num: number): Promise<number> {
  return Promise.resolve(num * 10);
}

async function dummyAsyncCond(condition: boolean): Promise<boolean> {
  return Promise.resolve(condition);
}

function dummy(num: number): number {
  return num * 10;
}

Deno.test("Chaining: aMap() and aFilter()", async function (): Promise<
  void
> {
  const outputArray =
    await (await AsyncRay(inputArray).aMap(async (i) => dummyAsync(i))).aFilter(
      async (i) => dummyAsyncCond(!!i),
    );

  assertEquals(outputArray instanceof Array, true);
  assertEquals(outputArray instanceof AsyncArray, true);
});

Deno.test("Chaining: aMap() and map()", async function (): Promise<
  void
> {
  const outputArray =
    (await AsyncRay(inputArray).aMap(async (i) => dummyAsync(i))).map(dummy);

  assertArrayContains(outputArray, [100, 200, 300, 400]);
});

Deno.test("Chaining: aMap() and reduce()", async function (): Promise<
  void
> {
  const output = (await AsyncRay(inputArray).aMap(async (i) => dummyAsync(i)))
    .reduce((acc, i) => acc + dummy(i), 100);

  assertEquals(output, 1100);
});

Deno.test("Chaining: aMap() and find()", async function (): Promise<
  void
> {
  const output = (await AsyncRay(inputArray).aMap(async (i) => dummyAsync(i)))
    .find((e) => e === 20);

  assertEquals(output, 20);
});

Deno.test("Chaining: aFilter() and map()", async function (): Promise<
  void
> {
  const outputArray = (await AsyncRay(inputArray).aFilter(
    async (i) => (await dummyAsync(i)) > 20,
  )).map(dummy);

  assertArrayContains(outputArray, [30, 40]);
});

Deno.test("Chaining: aFilter() and reduce()", async function (): Promise<
  void
> {
  const output = (await AsyncRay(inputArray).aFilter(
    async (i) => (await dummyAsync(i)) > 20,
  )).reduce((acc, i) => acc + dummy(i), 100);

  assertEquals(output, 170);
});

Deno.test("Chaining: aFilter() and find()", async function (): Promise<
  void
> {
  const output = (await AsyncRay(inputArray).aFilter(
    async (i) => (await dummyAsync(i)) > 20,
  )).find((e) => e === 4);

  assertEquals(output, 4);
});
