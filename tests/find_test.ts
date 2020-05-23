import { AsyncRay } from "../mod.ts";
import { assertArrayContains, assertEquals } from "./test_deps.ts";

const inputArray: number[] = [1, 2, 3, 4];

async function dummy(condition: boolean): Promise<boolean> {
  return Promise.resolve(condition);
}

Deno.test("Find: should find", async function (): Promise<
  void
> {
  const output = await AsyncRay(inputArray).aFind(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element === 2);
    },
  );

  assertEquals(output, 2);
});

Deno.test("Find: should not find", async function (): Promise<
  void
> {
  const output = await AsyncRay(inputArray).aFind(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element === 20);
    },
  );

  assertEquals(typeof output, "undefined");
});
