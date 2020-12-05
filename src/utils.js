/**
 * promiseFromTryCatch.
 *
 * @param fn - the function to wrap in a try/catch + promise
 *
 * @returns curried version of the function that will return a promise which will resolve to the original return value of the promise
 */
export const promiseFromTryCatch = fn => {
  const arity = fn.length
  return function $curry (...args) {
    return args.length < arity
      ? $curry.bind(null, ...args)
      : new Promise((resolve, reject) => {
        try {
          resolve(fn(...args))
        } catch (error) {
          reject(error)
        }
      })
  }
}
