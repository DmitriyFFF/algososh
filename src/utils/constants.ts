export const timeDelay = async(ms: number) => await new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
})
