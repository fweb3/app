import { fetcher, sleep, prettyParseBalance, balanceToInt } from './util'

describe('utils', () => {
  it('fetches', async () => {
    // eslint-disable-next-line
    // @ts-ignore
    global.fetch = jest.fn(async () => ({
      json: async () => 'response',
    }))

    const actual = await fetcher('foo')
    expect(actual).toEqual('response')
  })

  it('sleeps', () => {
    sleep(1)
    sleep()
  })

  it('pretty parses raw balance', () => {
    const towei = prettyParseBalance('1', 18, 18)
    expect(towei).toBe('0.000000000000000001')
    const toEth = prettyParseBalance('10000000000000000000000')
    expect(toEth).toBe('10,000')
  })

  it('converts raw balance to int', () => {
    const defaultVal = balanceToInt('1000')
    const actual = balanceToInt('1000', 2, 0)
    expect(actual).toBe(10)
    expect(defaultVal).toBe(0)
  })
})
