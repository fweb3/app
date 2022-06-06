import { logger } from '../logger'

jest.spyOn(console, 'log')

describe('logger', () => {
  it('logs when should and dont when shouldnt', () => {
    process.env.NEXT_PUBLIC_DEBUG_LOG = 'true'
    logger.log('foo')
    expect(console.log).toHaveBeenCalled()
  })
})
