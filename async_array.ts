import { CallBackEvery, aEvery } from "./methods/a_every.ts";
import { CallBackFilter, aFilter } from "./methods/a_filter.ts";
import { CallBackFind, aFind } from "./methods/a_find.ts";
import { CallBackFindIndex, aFindIndex } from "./methods/a_find_index.ts";
import { CallBackFlatMap, aFlatMap } from "./methods/a_flat_map.ts";
import { CallBackForEach, aForEach } from "./methods/a_foreach.ts";
import { CallBackMap, aMap } from "./methods/a_map.ts";
import { CallBackReduce, aReduce } from "./methods/a_reduce.ts";
import { CallBackReduceRight, aReduceRight } from "./methods/a_reduce_right.ts";
import { CallBackSome, aSome } from "./methods/a_some.ts";

/**
 * AsyncArray Class
 *
 * @class AsyncArray
 * @extends {Array<T>}
 * @template T
 */
export class AsyncArray<T> extends Array<T> {
  /**
   * Creates an instance of AsyncArray
   * @param {...T[]} args
   * @memberof AsyncArray
   */
  constructor(...args: T[]) {
    /***
     * Why we need this ?
     * if we pass one element array with an number as below,
     * const foo = AsyncArray(...[20]);
     * Based https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Syntax
     * a new Array will be created with 20 empty elements, as below.
     * [null, null, ...]
     * In order to avoid that, we need the particular workaround
     */
    if (args.length === 1 && typeof args[0] === "number") {
      super(1);
      super[0] = args[0];
    } else {
      super(...args);
    }
  }

  /**
   * Async Every method
   *
   * @param {CallBackEvery<T>} cb
   * @returns {Promise<boolean>}
   * @memberof AsyncArray
   */
  async aEvery(cb: CallBackEvery<T>): Promise<boolean> {
    return aEvery<T>(this, cb);
  }

  /**
   * Async FlatMap method
   *
   * @template R
   * @param {CallBackFlatMap<T, R>} cb
   * @returns {Promise<R[]>}
   * @memberof AsyncArray
   */
  async aFlatMap<R>(cb: CallBackFlatMap<T, R>): Promise<AsyncArray<R>> {
    return new AsyncArray(...(await aFlatMap<T, R>(this, cb)));
  }

  /**
   * Async Filter method
   *
   * @param {CallBackFilter<T>} cb
   * @returns {Promise<T[]>}
   * @memberof AsyncArray
   */
  async aFilter(cb: CallBackFilter<T>): Promise<AsyncArray<T>> {
    return new AsyncArray(...(await aFilter<T>(this, cb)));
  }

  /**
   * Async find method
   *
   * @param {CallBackFind<T>} cb
   * @returns {Promise<T | undefined>}
   * @memberof AsyncArray
   */
  async aFind(cb: CallBackFind<T>): Promise<T | undefined> {
    return aFind<T>(this, cb);
  }

  /**
   * Async findIndex method
   *
   * @param {CallBackFindIndex<T>} cb
   * @returns {Promise<number>}
   * @memberof AsyncArray
   */
  async aFindIndex(cb: CallBackFindIndex<T>): Promise<number> {
    return aFindIndex<T>(this, cb);
  }

  /**
   * Async ForEach method
   *
   * @param {CallBackForEach<T>} cb
   * @returns {Promise<void>}
   * @memberof AsyncArray
   */
  async aForEach(cb: CallBackForEach<T>): Promise<void> {
    await aForEach<T>(this, cb);
  }

  /**
   * Async Map method
   *
   * @template R
   * @param {CallBackMap<T, R>} cb
   * @returns {Promise<R[]>}
   * @memberof AsyncArray
   */
  async aMap<R>(cb: CallBackMap<T, R>): Promise<AsyncArray<R>> {
    return new AsyncArray(...(await aMap<T, R>(this, cb)));
  }

  /**
   * Async Reduce method
   *
   * @template R
   * @param {CallBackReduce<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<T | R>}
   * @memberof AsyncArray
   */
  async aReduce<R>(
    cb: CallBackReduce<T, R>,
    initialValue?: R,
  ): Promise<T | R> {
    return aReduce(this, cb, initialValue);
  }

  /**
   * Async ReduceRight method
   *
   * @template R
   * @param {CallBackReduceRight<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<T | R>}
   * @memberof AsyncArray
   */
  async aReduceRight<R>(
    cb: CallBackReduceRight<T, R>,
    initialValue?: R,
  ): Promise<T | R> {
    return aReduceRight(this, cb, initialValue);
  }

  /**
   * Async Some method
   *
   * @param {CallBackSome<T>} cb
   * @returns {Promise<boolean>}
   * @memberof AsyncArray
   */
  async aSome(cb: CallBackSome<T>): Promise<boolean> {
    return aSome<T>(this, cb);
  }
}
