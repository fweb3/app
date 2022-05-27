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

export interface IDot {
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

export interface IDotsMap {
  [idx: string]: IDot
}

export const POS_MAP = {
  lg: {
    row1: 187,
    row2: 276,
    row3: 363,
    col1: 380,
    col2: 470,
    col3: 558,
  },
}

const LG_ROW_1 = 187
const LG_ROW_2 = 276
const LG_ROW_3 = 363
const LG_COL_1 = 380
const LG_COL_2 = 470
const LG_COL_3 = 558

const MD_ROW_1 = 149
const MD_ROW_2 = 217
const MD_ROW_3 = 287
const MD_COL_1 = 300
const MD_COL_2 = 370
const MD_COL_3 = 438

const SM_ROW_1 = 118
const SM_ROW_2 = 179
const SM_ROW_3 = 237
const SM_COL_1 = 247
const SM_COL_2 = 305
const SM_COL_3 = 363

export const DOTS_MAP: IDotsMap = {
  '0': {
    task: DotKey.isConnected,
    tooltip: 'Connect your wallet',
    isCompleted: true,
    position: {
      dot: {
        lg: [LG_COL_1, LG_ROW_1],
        md: [MD_COL_1, MD_ROW_1],
        sm: [SM_COL_1, SM_ROW_1],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  '1': {
    task: DotKey.hasEnoughTokens,
    tooltip: 'Get at least 300 FWEB3',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_2, LG_ROW_1],
        md: [MD_COL_2, MD_ROW_1],
        sm: [SM_COL_2, SM_ROW_1],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  '2': {
    task: DotKey.hasUsedFaucet,
    tooltip: 'Get native token, MATIC to pay gas',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_3, LG_ROW_1],
        md: [MD_COL_3, MD_ROW_1],
        sm: [SM_COL_3, SM_ROW_1],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  '3': {
    task: DotKey.hasSentTokens,
    tooltip: 'Send 100 FWEB3 tokens to someone',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_1, LG_ROW_2],
        md: [MD_COL_1, MD_ROW_2],
        sm: [SM_COL_1, SM_ROW_2],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  '4': {
    task: DotKey.hasMintedNFT,
    tooltip: 'Mint a FWEB3 NFT',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_2, LG_ROW_2],
        md: [MD_COL_2, MD_ROW_2],
        sm: [SM_COL_2, SM_ROW_2],
      },
      tooltip: {
        md: [],
        sm: [],
      },
    },
  },
  '5': {
    task: DotKey.hasBurnedTokens,
    tooltip: 'Burn at least one FWEB3 token',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_3, LG_ROW_2],
        md: [MD_COL_3, MD_ROW_2],
        sm: [SM_COL_3, SM_ROW_2],
      },
      tooltip: {
        md: [],
      },
    },
  },
  '6': {
    task: DotKey.hasSwappedTokens,
    tooltip: 'Swap a FWEB3 token for some MATIC',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_1, LG_ROW_3],
        md: [MD_COL_1, MD_ROW_3],
        sm: [SM_COL_1, SM_ROW_3],
      },
      tooltip: {
        md: [],
      },
    },
  },
  '7': {
    task: DotKey.hasVotedInPoll,
    tooltip: 'Vote in a FWEB3 poll',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_2, LG_ROW_3],
        md: [MD_COL_2, MD_ROW_3],
        sm: [SM_COL_2, SM_ROW_3],
      },
      tooltip: {
        md: [],
      },
    },
  },
  '8': {
    task: DotKey.hasDeployedContract,
    tooltip: 'Write and deploy a smart contract',
    isCompleted: false,
    position: {
      dot: {
        lg: [LG_COL_3, LG_ROW_3],
        md: [MD_COL_3, MD_ROW_3],
        sm: [SM_COL_3, SM_ROW_3],
      },
      tooltip: {
        md: [],
      },
    },
  },
}
