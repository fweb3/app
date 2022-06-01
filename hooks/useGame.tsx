import { GameContext } from '../providers/GameProvider'
import { useContext } from 'react'

// implementation in ./providers/GameProvider.tsx
export const useGame = () => useContext(GameContext)
