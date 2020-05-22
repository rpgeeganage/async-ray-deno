import { AsyncArray } from "./async_array.ts";
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

type CallBacks =
  | CallBackEvery<any>
  | CallBackFilter<any>
  | CallBackFind<any>
  | CallBackFindIndex<any>
  | CallBackMap<any, any>
  | CallBackReduce<any, any>
  | CallBackReduceRight<any, any>
  | CallBackSome<any>
  | CallBackFlatMap<any, any>;

/**
 * Interface for the single entry for the call stack
 *
 * @interface SingleCall
 */
interface SingleCall {
  method: Function;
  callBack: CallBacks;
  additional?: any;
}

/**
 * Chainable function handler
 *
 * @export
 * @class Chainable
 * @template T
 */
export class Chainable<T> {
  /**
   * Call Stack
   *
   * @private
   * @type {SingleCall[]}
   * @memberof Chainable
   */
  private callQueue: SingleCall[] = [];

  /**
   * Creates an instance of Chainable.
   * @param {T[]} input
   * @memberof Chainable
   */
  constructor(public input: T[]) {}

  /**
   * aEvery method of Async-Ray lib
   *
   * @param {CallBackEvery<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aEvery(cb: CallBackEvery<T>): Promise<any> {
    return this.addNoneChainableMethod(aEvery, cb);
  }

  /**
   * aFilter method of Async-Ray lib
   *
   * @param {CallBackFilter<T>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aFilter(cb: CallBackFilter<T>): Chainable<T> {
    return this.addChainableMethod(aFilter, cb);
  }

  /**
   * aFindIndex method of Async-Ray lib
   *
   * @param {CallBackFindIndex<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aFindIndex(cb: CallBackFindIndex<T>): Promise<any> {
    return this.addNoneChainableMethod(aFindIndex, cb);
  }

  /**
   * aFind method of Async-Ray lib
   *
   * @param {CallBackFind<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aFind(cb: CallBackFind<T>): Promise<any> {
    return this.addNoneChainableMethod(aFind, cb);
  }

  /**
   * aForEach method of Async-Ray lib
   *
   * @param {CallBackForEach<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aForEach(cb: CallBackForEach<T>): Promise<any> {
    return this.addNoneChainableMethod(aForEach, cb);
  }

  /**
   * aMap method of Async-Ray lib
   *
   * @template R
   * @param {CallBackMap<T, R>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aMap<R>(cb: CallBackMap<T, R>): Chainable<T> {
    return this.addChainableMethod(aMap, cb);
  }

  /**
   * aReduceRight method of Async-Ray lib
   *
   * @template R
   * @param {CallBackReduceRight<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aReduceRight<R>(
    cb: CallBackReduceRight<T, R>,
    initialValue?: R,
  ): Promise<any> {
    return this.addNoneChainableMethod(aReduceRight, cb, initialValue);
  }

  /**
   * aReduce method of Async-Ray lib
   *
   * @template R
   * @param {CallBackReduce<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aReduce<R>(cb: CallBackReduce<T, R>, initialValue?: R): Promise<any> {
    return this.addNoneChainableMethod(aReduce, cb, initialValue);
  }

  /**
   * aSome method of Async-Ray lib
   *
   * @template R
   * @param {CallBackSome<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aSome<R>(cb: CallBackSome<T>): Promise<any> {
    return this.addNoneChainableMethod(aSome, cb);
  }

  /**
   * aFlatMap method of Async-Ray lib
   *
   * @template R
   * @param {CallBackFlatMap<T, R>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aFlatMap<R>(cb: CallBackFlatMap<T, R>): Chainable<T> {
    return this.addChainableMethod(aFlatMap, cb);
  }

  /**
   * Process the call stack
   *
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  async process(): Promise<any> {
    let currentInput = this.input;
    while (this.callQueue.length) {
      try {
        const nextCall = this.callQueue.shift() as SingleCall;
        currentInput = await nextCall.method.call(
          null,
          currentInput,
          nextCall.callBack,
          nextCall.additional,
        );
      } catch (error) {
        this.clear();

        throw error;
      }
    }

    if (Array.isArray(currentInput)) {
      return new AsyncArray<T>(...currentInput);
    }

    return currentInput;
  }

  /**
   * Add chainable method to the call queue
   *
   * @private
   * @param {Function} method
   * @param {CallBacks} callBack
   * @param {*} [additional]
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  private addChainableMethod(
    method: Function,
    callBack: CallBacks,
    additional?: any,
  ): Chainable<T> {
    this.add(method, callBack, additional);

    return this;
  }

  /**
   * Add none chainable method to the queue and execute the chaining process
   *
   * @private
   * @param {Function} method
   * @param {CallBacks} callBack
   * @param {*} [additional]
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  private addNoneChainableMethod(
    method: Function,
    callBack: CallBacks,
    additional?: any,
  ): Promise<any> {
    this.add(method, callBack, additional);

    return this.process();
  }

  /**
   * Add element to the call queue
   *
   * @private
   * @param {Function} method
   * @param {CallBacks} callBack
   * @memberof Chainable
   */
  private add(method: Function, callBack: CallBacks, additional?: any): void {
    this.callQueue.push({ method, callBack, additional });
  }

  /**
   * clear the call queue
   *
   * @private
   * @memberof Chainable
   */
  private clear() {
    this.callQueue = [];
  }
}
