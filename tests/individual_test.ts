import { aEvery } from "../methods/a_every.ts";
import { aFilter } from "../methods/a_filter.ts";
import { aFind } from "../methods/a_find.ts";
import { aFindIndex } from "../methods/a_find_index.ts";
import { aFlatMap } from "../methods/a_flat_map.ts";
import { aForEach } from "../methods/a_foreach.ts";
import { aMap } from "../methods/a_map.ts";
import { aReduce } from "../methods/a_reduce.ts";
import { aReduceRight } from "../methods/a_reduce_right.ts";
import { aSome } from "../methods/a_some.ts";
import { assertArrayContains, assertEquals } from "./test_deps.ts";

Deno.test("Testing individual methods: every", async function (): Promise<
  void
> {
  const response = await aEvery([1, 2, 3], async (e) => Promise.resolve(e > 0));

  assertEquals(response, true);
});

Deno.test("Testing individual methods: aFlatMap", async function (): Promise<
  void
> {
  const response = await aFlatMap(
    [1, 2, 3],
    async (e) => Promise.resolve([e, e * 2]),
  );

  assertArrayContains(response, [1, 2, 2, 4, 3, 6]);
});

Deno.test("Testing individual methods: aFilter", async function (): Promise<
  void
> {
  const response = await aFilter(
    [1, 2, 3],
    async (e) => Promise.resolve(e > 1),
  );

  assertArrayContains(response, [2, 3]);
});

Deno.test("Testing individual methods: aFind", async function (): Promise<
  void
> {
  const response = await aFind(
    [1, 2, 3],
    async (e) => Promise.resolve(e === 3),
  );

  assertEquals(response, 3);
});

Deno.test("Testing individual methods: aFindIndex", async function (): Promise<
  void
> {
  const response = await aFindIndex(
    [1, 2, 3],
    async (e) => Promise.resolve(e === 2),
  );

  assertEquals(response, 1);
});

Deno.test("Testing individual methods: aForEach", async function (): Promise<
  void
> {
  const response: number[] = [];

  await aForEach([1, 2, 3], async (e) => {
    const op = await Promise.resolve(e * 10);
    response.push(op);
  });

  assertArrayContains(response, [10, 20, 30]);
});

Deno.test("Testing individual methods: aMap", async function (): Promise<
  void
> {
  const response = await aMap([1, 2, 3], async (e) => Promise.resolve(e * 10));

  assertArrayContains(response, [10, 20, 30]);
});

Deno.test("Testing individual methods: aReduce", async function (): Promise<
  void
> {
  const response = await aReduce(
    [1, 2, 3],
    async (acc, e) => Promise.resolve(e + acc),
    0,
  );

  assertEquals(response, 6);
});

Deno.test("Testing individual methods: aReduceRight", async function (): Promise<
  void
> {
  const response = await aReduceRight(
    [1, 2, 3],
    async (acc, e) => Promise.resolve(e + acc),
    0,
  );

  assertEquals(response, 6);
});

Deno.test("Testing individual methods: every", async function (): Promise<
  void
> {
  const response = await aSome(
    [1, 2, 3],
    async (e: number) => Promise.resolve(e > 1),
  );

  assertEquals(response, true);
});
