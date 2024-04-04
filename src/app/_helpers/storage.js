export const hasItem = key => Boolean(sessionStorage.getItem(key))

export const setItem = (key, data) => sessionStorage.setItem(key, data)

export const getItem = key => sessionStorage.getItem(key)

export const removeItem = key => sessionStorage.removeItem(key)
