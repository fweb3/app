import { DOTS_MAP } from '../../components/Chest/dots'
import { createShareInfo } from './social'

describe('socials', () => {
  it('creates share info', () => {
    const actual = createShareInfo('0', '', DOTS_MAP)
    expect(actual.imageUrl).toBe('https://fweb3.xyz/fweb3.png')
    expect(actual.tweetText?.includes('🟣⚫️⚫️')).toBeTruthy()
  })

  it('creates socials for trophy winner', () => {
    const actual = createShareInfo('1', '0', DOTS_MAP)
    expect(actual.imageUrl).toBe('https://fweb3.xyz/fweb_yearone_0.png')
  })
})
