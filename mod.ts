import { AsyncArray } from "./async_array.ts";
import { Chainable } from "./chainable.ts";

/**
 * Get AsyncArray element
 *
 * @export
 * @template T
 * @param {...T[]} elements
 * @returns
 */
export function AsyncRay<T>(elements: T[]) {
  return new AsyncArray<T>(...elements);
}

/**
 * Get chainable instance
 *
 * @export
 * @template T
 * @param {T[]} input
 * @returns
 */
export function Chain<T>(input: T[]) {
  return new Chainable<T>(input);
}

export * from "./methods/a_every.ts";
export * from "./methods/a_filter.ts";
export * from "./methods/a_find.ts";
export * from "./methods/a_find_index.ts";
export * from "./methods/a_flat_map.ts";
export * from "./methods/a_foreach.ts";
export * from "./methods/a_map.ts";
export * from "./methods/a_reduce.ts";
export * from "./methods/a_reduce_right.ts";
export * from "./methods/a_some.ts";
