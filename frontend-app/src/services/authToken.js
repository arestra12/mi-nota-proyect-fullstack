let getTokenFn = null

export const setTokenGetter = (fn) => {
  getTokenFn = fn
}

export const getAuthToken = async () => {
  if (!getTokenFn) throw new Error("Token no inicializado")
  return await getTokenFn()
}