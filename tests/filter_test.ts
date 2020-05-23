import { AsyncArray } from "../async_array.ts";
import { AsyncRay } from "../mod.ts";
import { assertArrayContains, assertEquals } from "./test_deps.ts";

const inputArray: number[] = [1, 2, 3, 4];

async function dummy(condition: boolean): Promise<boolean> {
  return Promise.resolve(condition);
}

Deno.test("Filter: should return a proper instance", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).filter(async (i: number) =>
    dummy(!!i)
  );

  assertEquals(outputArray instanceof AsyncArray, true);
  assertEquals(outputArray instanceof Array, true);
});

Deno.test("Filter: should filter and send a none-empty array", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).aFilter(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element >= 2);
    },
  );

  assertArrayContains(outputArray, [2, 3, 4]);
});

Deno.test("Filter: should filter and send a empty array", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).aFilter(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element >= 200);
    },
  );

  assertArrayContains(outputArray, []);
});
