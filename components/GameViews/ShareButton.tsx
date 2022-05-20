import { useConnection, useGame } from '../../providers'
import { CommonLink } from '../shared/Elements'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const ShareButton = () => {
  const [shareImageUrl, setShareImageUrl] = useState('')
  const { account, isConnected } = useConnection()
  const [shareText, setShareText] = useState('')
  const { hasWonGame, trophyId } = useGame()
  const { query } = useRouter()

  const handleShare = () => {
    // ;() => {
    //   let gameTiles = document.getElementsByClassName('game-tile')
    //   let completedGameTiles = []
    //   let finalShareText
    //   for (let i = 0; i < gameTiles.length; i++) {
    //     completionStates?.push(
    //       gameTiles[i].classList.contains('completed') || hasWonGame ? 1 : 0
    //     )
    //   }
    //   if (hasWonGame) {
    //     finalShareText =
    //       `${shareText} @fweb3_\n\nhttps://fweb3.xyz?wallet=` +
    //       (account ? account : query.wallet) +
    //       `&won=${trophyId}`
    //   } else {
    //     finalShareText = `${shareText} @fweb3_ ${completedGameTiles.reduce(
    //       (a, b) => a + b
    //     )}/9\n\n`
    //     for (let i = 0; i < gameTiles.length; i++) {
    //       finalShareText += completedGameTiles[i] ? '🟣' : '⚫️'
    //       if (i % 3 == 2 && i != gameTiles.length - 1) {
    //         finalShareText += '\n'
    //       }
    //     }
    //   }
    //   if (navigator.share) {
    //     navigator.share({
    //       text: finalShareText,
    //     })
    //   } else {
    //     window.open(
    //       'https://twitter.com/intent/tweet?text=' +
    //         encodeURIComponent(finalShareText)
    //     )
    //   }
    // }
  }

  useEffect(() => {
    if (hasWonGame || parseInt(trophyId) >= 1) {
      // const trophyColor = getTrophyColor(trophyId)
      // const shareText = `🏆 I won a ${trophyColor} trophy in Fweb3!`
      // const shareImageUrl = `https://fweb3.xyz/fweb_yearone_${trophyColor}.png`
      // setShareImageUrl(shareImageUrl)
      // setShareText(shareText)
    }
  }, [hasWonGame, trophyId])

  return (
    <CommonLink href="#" onClick={handleShare}>
      {hasWonGame ? 'Share your win' : 'Share your progress'}
    </CommonLink>
  )
}
