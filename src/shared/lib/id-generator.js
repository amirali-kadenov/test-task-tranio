/**
 * @param {number} start
 */
export function* idGenerator(start = 0) {
  let id = start

  while (true) {
    yield id++
  }
}
