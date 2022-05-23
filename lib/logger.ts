const shouldLog =
  process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_DEBUG_LOG

export const logger = {
  log: (args: any) => {
    if (shouldLog) {
      console.log(args)
    }
  },
}
