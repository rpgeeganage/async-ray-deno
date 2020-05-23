import { AsyncArray } from "../async_array.ts";
import { AsyncRay } from "../mod.ts";
import { assertArrayContains, assertEquals } from "./test_deps.ts";

const inputArray: number[] = [1, 2, 3, 4];

async function dummyArray(num: number): Promise<number[]> {
  return Promise.resolve([num, num * 2]);
}

async function dummy(num: number): Promise<number> {
  return Promise.resolve(num * 2);
}

Deno.test("FlatMap: should return an instance of AsyncArray", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).aFlatMap(async () =>
    undefined
  );

  assertEquals(outputArray instanceof AsyncArray, true);
  assertEquals(outputArray instanceof Array, true);
});

Deno.test("FlatMap: should flatMap the given cb return array", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).aFlatMap(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummyArray(element);
    },
  );

  assertArrayContains(outputArray, [1, 2, 2, 4, 3, 6, 4, 8]);
});

Deno.test("FlatMap: should flatMap the given cb return single element", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).aFlatMap(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element);
    },
  );

  assertArrayContains(outputArray, [2, 4, 6, 8]);
});
