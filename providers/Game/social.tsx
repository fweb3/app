import { IDotsMap } from '../../components/Chest/dots'

export interface ISocialShare {
  imageUrl?: string
  tweetText?: string
  tweetUrl?: string
}

export const createShareInfo = (
  trophyId: string,
  trophyColor: string,
  mappedDots: IDotsMap
): ISocialShare => {
  const TWEET = 'https://twitter.com/intent/tweet?text='
  const imageUrl = createSocialShareImageUrl(trophyId, trophyColor)
  const tweetText = createTweetText(trophyId, trophyColor, mappedDots)
  return {
    tweetUrl: `${TWEET}${encodeURIComponent(tweetText)}`,
    imageUrl,
    tweetText,
  }
}

const createTweetText = (
  trophyId: string,
  trophyColor: string,
  mappedDots: IDotsMap
) => {
  if (parseInt(trophyId) >= 1 && trophyColor) {
    return `🏆 I won a ${trophyColor} trophy in #fWeb3`
  }
  const numComplete = Object.entries(mappedDots).filter(([k, v]) => v).length
  if (numComplete >= 1) {
    let text = ''
    Object.entries(mappedDots).forEach(([k, v], i) => {
      text += v.isCompleted ? '🟣' : '⚫️'
      if (i % 3 === 2 && i !== Object.keys(mappedDots).length - 1) {
        text += '\n'
      }
    })
    return `${text}\n♥️ #fweb3`
  }
  return 'I ♥️ #fweb3'
}

const createSocialShareImageUrl = (trophyId, trophyColor) => {
  if (parseInt(trophyId) >= 1) {
    return `https://fweb3.xyz/fweb_yearone_${trophyColor}.png`
  }
  return 'https://fweb3.xyz/fweb3.png'
}
