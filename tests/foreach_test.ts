import { AsyncRay } from "../mod.ts";
import { assertArrayContains, assertEquals } from "./test_deps.ts";

const inputArray: number[] = [1, 2, 3, 4];

async function dummy(num: number): Promise<number> {
  return Promise.resolve(num);
}

Deno.test("ForEach: should map the given cb", async function (): Promise<
  void
> {
  const outputArray: number[] = [];

  await AsyncRay(inputArray).aForEach(
    async (element: number, index?: number, collection?: number[]) => {
      assertEquals(collection instanceof Array, true);
      assertArrayContains(collection as number[], inputArray);
      assertEquals(typeof element, "number");
      assertEquals(typeof index, "number");

      outputArray.push(await dummy(element));
    },
  );

  assertArrayContains(outputArray, inputArray);
});
