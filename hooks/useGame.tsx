import { GameContext } from '../providers/GameProvider'
import { useContext } from 'react'

export const useGame = () => useContext(GameContext)
