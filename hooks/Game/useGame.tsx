import { GameContext } from './GameProvider'
import { useContext } from 'react'

export const useGame = () => useContext(GameContext)
