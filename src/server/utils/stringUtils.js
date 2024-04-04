import { pathToRegexp } from 'path-to-regexp'

export const replacePathParams = ({ rawPath, body, query }) => {
  const keys = []
  let replacedPath = rawPath
  pathToRegexp(rawPath, keys)

  keys.forEach(key => {
    const { name } = key
    const valueToReplace =
      name in query ? query[name] : name in body && body[name]

    if (valueToReplace) {
      replacedPath = replacedPath.replace(`:${name}`, valueToReplace)
    }
  })

  return replacedPath
}

export default null
