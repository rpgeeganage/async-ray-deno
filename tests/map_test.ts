import { AsyncArray } from "../async_array.ts";
import { AsyncRay } from "../mod.ts";
import { assertArrayContains, assertEquals } from "./test_deps.ts";

const inputArray: number[] = [1, 2, 3, 4];

async function dummy(num: number): Promise<number> {
  return Promise.resolve(num * 10);
}

Deno.test("Map: should return a proper instance", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).aMap(async () => undefined);

  assertEquals(outputArray instanceof AsyncArray, true);
  assertEquals(outputArray instanceof Array, true);
});

Deno.test("Map: should map the given cb", async function (): Promise<
  void
> {
  const outputArray = await AsyncRay(inputArray).aMap(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element);
    },
  );

  assertArrayContains(outputArray, [10, 20, 30, 40]);
});
