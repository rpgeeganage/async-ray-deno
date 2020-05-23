import { AsyncRay } from "../mod.ts";
import {
  assertArrayContains,
  assertEquals,
  assertThrowsAsync,
} from "./test_deps.ts";

async function dummy(num: number): Promise<number> {
  return Promise.resolve(num * 10);
}

const inputArray: number[] = [1, 2, 3, 4];

Deno.test("Reduce: should throw error if array is empty and initial value is not defined", async function (): Promise<
  void
> {
  await assertThrowsAsync(
    async (): Promise<void> => {
      return AsyncRay([])
        .aReduce<any>(async (i) => i);
    },
    Error,
    "Reduce of empty array with no initial value",
  );
});

Deno.test("Reduce: With initial value: should return reduce values for number", async function (): Promise<
  void
> {
  const outputElement = await AsyncRay(inputArray).aReduce<number>(
    async (
      acc: number,
      element: number,
      index?: number,
      collection?: number[],
    ) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return acc + (await dummy(element));
    },
    1,
  );

  assertEquals(outputElement, 101);
});

Deno.test("Reduce: With initial value: should return reduce values for string", async function (): Promise<
  void
> {
  const inputString: string[] = ["s", "t", "r", "i", "n", "g"];
  const outputElement = await AsyncRay(inputString).aReduce<string>(
    async (
      acc: string,
      element: string,
      index?: number,
      collection?: string[],
    ) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as string[], inputString);
      assertEquals(typeof element, "string");
      assertEquals(typeof index, "number");

      return `${acc}${await Promise.resolve(element)}`;
    },
    "",
  );

  assertEquals(outputElement, "string");
});

Deno.test("Reduce: With initial value: should return reduce values for array containing arrays", async function (): Promise<
  void
> {
  const inputArrayOfArrays: [number, number][] = [[0, 1], [2, 3], [4, 5]];

  const outputArray = await AsyncRay(inputArrayOfArrays).aReduce<number[]>(
    async (
      acc: number[],
      element: number[],
      index?: number,
      collection?: [number, number][],
    ) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as [number, number][], inputArrayOfArrays);
      assertEquals(Array.isArray(element), true);
      assertEquals(typeof index, "number");

      return Promise.resolve(acc.concat(element));
    },
    [],
  );

  assertArrayContains(outputArray, [0, 1, 2, 3, 4, 5]);
});

Deno.test("Reduce: Without initial value: should return reduce values for number", async function (): Promise<
  void
> {
  const copiedArray = [...inputArray];

  const outputElement = await AsyncRay(copiedArray).aReduce<number>(
    async (
      acc: number,
      element: number,
      index?: number,
      collection?: number[],
    ) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], copiedArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return acc + (await dummy(element));
    },
  );

  assertEquals(outputElement, 91);
});

Deno.test("Reduce: Without initial value: should return reduce values for string", async function (): Promise<
  void
> {
  const inputString: string[] = ["s", "t", "r", "i", "n", "g"];
  const copiedString = [...inputString];
  copiedString.shift();

  const outputElement = await AsyncRay(inputString).aReduce<string>(
    async (
      acc: string,
      element: string,
      index?: number,
      collection?: string[],
    ) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as string[], inputString);
      assertEquals(typeof element, "string");
      assertEquals(typeof index, "number");

      return `${acc}${await Promise.resolve(element)}`;
    },
  );

  assertEquals(outputElement, "string");
});

Deno.test("Reduce: Without initial value: should return reduce values for array containing arrays", async function (): Promise<
  void
> {
  const inputArrayOfArrays: [number, number][] = [[0, 1], [2, 3], [4, 5]];
  const copiedArrayOfArrays = [...inputArrayOfArrays];
  copiedArrayOfArrays.shift();

  const outputArray = await AsyncRay(inputArrayOfArrays).aReduce<number[]>(
    async (
      acc: number[],
      element: number[],
      index?: number,
      collection?: [number, number][],
    ) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as [number, number][], inputArrayOfArrays);
      assertEquals(Array.isArray(element), true);
      assertEquals(typeof index, "number");

      return Promise.resolve(acc.concat(element));
    },
  );

  assertArrayContains(outputArray, [0, 1, 2, 3, 4, 5]);
});
