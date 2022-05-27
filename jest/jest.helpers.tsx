import { DOTS_MAP, IDotsMap } from '../components/Chest/dots'

export const setCompleteTasks = (tasks: string[], all?: boolean): IDotsMap => {
  Object.entries(DOTS_MAP).forEach(([k, v]) => {
    if (tasks.includes(v.task) || all) {
      DOTS_MAP[k].isCompleted = true
    }
  })
  return DOTS_MAP
}
