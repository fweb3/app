import { DEFAULT_GAME_STATE } from './lib'

export const MOCK_GAME_CONTEXT = {
  gameTaskState: DEFAULT_GAME_STATE,
  setActiveDot: jest.fn().mockReturnValue('0'),
  isFetchingGameData: false,
  tokenContract: null,
  gameContract: null,
  completedTasks: {},
  hasWonGame: false,
  activeDot: '0',
  trophyId: '',
  trophyColor: '',
  isVerified: false,
  shareInfo: {
    imageUrl: 'https://www.fillmurray.com/666/666',
    tweetText: 'tweet-deedly-deet',
    tweetUrl: 'youre RL',
  },
  isJudge: false,
  resetGameState: jest.fn(),
  isDotComplete: jest.fn().mockReturnValue(false),
}
