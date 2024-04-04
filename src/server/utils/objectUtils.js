export const isEmptyObject = obj => {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false
    }
  }

  return true
}

export default null
