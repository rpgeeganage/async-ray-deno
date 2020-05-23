import { AsyncArray } from "../async_array.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test("should create an empty array", function(): void {
  const array = new AsyncArray(...[]);
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 0);
});

Deno.test("should create an array of 1 positive number", function(): void {
  const array = new AsyncArray(...[20]);
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 1);
  assertEquals(array[0], 20);
});

Deno.test("should create an array of 1 negative number", function(): void {
  const array = new AsyncArray(...[-20]);
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 1);
  assertEquals(array[0], -20);
});

Deno.test("should create an array of 3 positive number", function(): void {
  const array = new AsyncArray(...[20, 40, 10]);
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 3);
  assertEquals(array[0], 20);
  assertEquals(array[1], 40);
  assertEquals(array[2], 10);
});

Deno.test("should create an array of 3 negative number", function(): void {
  const array = new AsyncArray(...[-20, -40, -10]);
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 3);
  assertEquals(array[0], -20);
  assertEquals(array[1], -40);
  assertEquals(array[2], -10);
});

Deno.test("should create an array of 1 string", function(): void {
  const array = new AsyncArray(...['test']);
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 1);
  assertEquals(array[0], 'test');
});

Deno.test("should create an array of 3 strings", function(): void {
  const array = new AsyncArray(...['test1', 'test2', 'test3']);
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 3);
  assertEquals(array[0], 'test1');
  assertEquals(array[1], 'test2');
  assertEquals(array[2], 'test3');
});

Deno.test("should create an array from string", function(): void {
  const array = new AsyncArray(...'test');
  assertEquals(array instanceof Array, true);
  assertEquals(array instanceof AsyncArray, true);
  assertEquals(array.length, 4);
  assertEquals(array[0], 't');
  assertEquals(array[1], 'e');
  assertEquals(array[2], 's');
  assertEquals(array[3], 't');
});
