import { DOTS_MAP } from '../../components/Chest/dots'

export const useGame = jest.fn(() => {
  return {
    completedTasks: DOTS_MAP,
  }
})
