import { DOTS_MAP } from '../components/Chest/dots'

export const setCompleteTasks = (tasks: string[]) => {
  Object.entries(DOTS_MAP).forEach(([k, v]) => {
    if (tasks.includes(v.task)) {
      DOTS_MAP[k].isCompleted = true
    }
  })
  return DOTS_MAP
}
