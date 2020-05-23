import { AsyncRay } from "../mod.ts";
import { assertArrayContains, assertEquals } from "./test_deps.ts";

const inputArray: number[] = [10, 20, 30, 40];

async function dummy(num: number, value: number): Promise<boolean> {
  return Promise.resolve(num > value);
}

Deno.test("Every: should return a proper instance", async function (): Promise<
  void
> {
  const output = await AsyncRay([]).aEvery(async () => true);

  assertEquals(typeof output, "boolean");
});

Deno.test("Every: should return true if all the elements satisfy the condition", async function (): Promise<
  void
> {
  const output = await AsyncRay(inputArray).aEvery(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element, 5);
    },
  );

  assertEquals(output, true);
});

Deno.test("Every: should return false if at least one element did not satisfy the condition", async function (): Promise<
  void
> {
  const output = await AsyncRay(inputArray).aEvery(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element, 35);
    },
  );

  assertEquals(output, false);
});

Deno.test("Every: should return false if none of elements satisfy the condition", async function (): Promise<
  void
> {
  const output = await AsyncRay(inputArray).aEvery(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      return dummy(element, 50);
    },
  );

  assertEquals(output, false);
});
