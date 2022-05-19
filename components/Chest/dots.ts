export enum DotKey {
  isConnected = 'isConnected',
  hasEnoughTokens = 'hasEnoughTokens',
  hasUsedFaucet = 'hasUsedFaucet',
  hasSentTokens = 'hasSentTokens',
  hasMintedNFT = 'hasMintedNFT',
  hasBurnedTokens = 'hasBurnedTokens',
  hasSwappedTokens = 'hasSwappedTokens',
  hasVotedInPoll = 'hasVotedInPoll',
  hasDeployedContract = 'hasDeployedContract',
}

export interface IDotsMap {
  [idx: number]: {
    task: string
    tooltip: string
    isCompleted: boolean
    position: {
      tooltip: {
        lg?: number[]
        md?: number[]
        sm?: number[]
      }
      dot: {
        lg?: number[]
        md?: number[]
        sm?: number[]
      }
    }
  }
}

const ROW_1 = 149
const ROW_2 = 217
const ROW_3 = 287
const COL_1 = 300
const COL_2 = 370
const COL_3 = 438

const SM_ROW_1 = 91
const SM_ROW_2 = 134
const SM_ROW_3 = 176
const SM_COL_1 = 185
const SM_COL_2 = 227
const SM_COL_3 = 269

export const DOTS_MAP: IDotsMap = {
  0: {
    task: DotKey.isConnected,
    tooltip: 'Connect your wallet',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_1, ROW_1],
        sm: [SM_COL_1, SM_ROW_1],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  1: {
    task: DotKey.hasEnoughTokens,
    tooltip: 'Use the faucet to get 300 $FWEB3 tokens',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_2, ROW_1],
        sm: [SM_COL_2, SM_ROW_1],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  2: {
    task: DotKey.hasUsedFaucet,
    tooltip: 'Use the faucet to get 0.042 $MATIC',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_3, ROW_1],
        sm: [SM_COL_3, SM_ROW_1],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  3: {
    task: DotKey.hasSentTokens,
    tooltip: 'Send 100 $FWEB3 tokens to someone',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_1, ROW_2],
        sm: [SM_COL_1, SM_ROW_2],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  4: {
    task: DotKey.hasMintedNFT,
    tooltip: 'Mint a Fweb3 NFT',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_2, ROW_2],
        sm: [SM_COL_2, SM_ROW_2],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  5: {
    task: DotKey.hasBurnedTokens,
    tooltip: 'Burn at least one $FWEB3 token',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_3, ROW_2],
        sm: [SM_COL_3, SM_ROW_2],
      },
      tooltip: {
        md: [],
      },
    },
  },
  6: {
    task: DotKey.hasSwappedTokens,
    tooltip: 'Swap a $FWEB3 token for some $MATIC',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_1, ROW_3],
        sm: [SM_COL_1, SM_ROW_3],
      },
      tooltip: {
        md: [],
      },
    },
  },
  7: {
    task: DotKey.hasVotedInPoll,
    tooltip: 'Vote on a Fweb3 poll',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_2, ROW_3],
        sm: [SM_COL_2, SM_ROW_3],
      },
      tooltip: {
        md: [],
      },
    },
  },
  8: {
    task: DotKey.hasDeployedContract,
    tooltip: 'Write and deploy a smart contract',
    isCompleted: false,
    position: {
      dot: {
        md: [COL_3, ROW_3],
        sm: [SM_COL_3, SM_ROW_3],
      },
      tooltip: {
        md: [],
      },
    },
  },
}
