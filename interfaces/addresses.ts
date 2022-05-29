import { logger } from '../lib'

interface IAddresses {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

const POLYGON_MATIC_FAUCETS: string[] = [
  '0x351050Ac0AdC9bff0622c1c0525b3322C328517f', // v3
  '0xe995b21d94638d81ae5123a65fc369f6aea429bc', // v1 schuster matic
  '0x92B4e3A9dB9700757Eb04C7Bf5908cAc57E07b50', // v4
]

const POLYGON_FWEB3_FAUCETS: string[] = [
  '0x67806adca0fd8825da9cddc69b9ba8837a64874b', // v1 schuster fweb3
  '0x82dB7fe5Cd26804E29534A7f648B780c313BC317', // v3
  '0x32Ba4765d6538944ef4324E55B94797a422C72F9', // v4
]

const ADDRESSES: IAddresses = {
  local: {
    v1: {
      fweb3_token: ['0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'],
      fweb3_game: ['0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'],
      fweb3_trophy: ['0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'],
      fweb3_token_faucet: ['0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'],
      fweb3_matic_faucet: ['0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'],
      fweb3_diamond_nft: ['0x5FbDB2315678afecb367f032d93F642f64180aa3'],
      fweb3_poll: ['0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'],
      swap_router: [''],
      genesys: ['0x0000000000000000000000000000000000000000'],
      burn: ['0x000000000000000000000000000000000000dead'],
    },
  },
  mumbai: {},
  polygon: {
    v1: {
      fweb3_token: ['0x4a14ac36667b574b08443a15093e417db909d7a3'],
      fweb3_game: ['0xc6c5F7B1a27528DD6F34EF164377965114bfA7D9'],
      fweb3_trophy: ['0x2a0493dee4f4b5e4b595326f0e73645f6f493923'],
      fweb3_token_faucet: POLYGON_FWEB3_FAUCETS,
      fweb3_matic_faucet: POLYGON_MATIC_FAUCETS,
      fweb3_diamond_nft: ['0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B'],
      fweb3_poll: ['0x718ad63821a6a3611Ceb706f15971ee029812365'],
      swap_router: ['0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45'],
      genesys: ['0x0000000000000000000000000000000000000000'],
      burn: ['0x000000000000000000000000000000000000dead'],
    },
  },
}

export const loadAddress = (
  name: string,
  network = 'polygon',
  version = 'v1'
): string[] => {
  logger.log(`[+] loading [${network}.${version}.${name}]`)
  return ADDRESSES[network]?.[version]?.[name] || []
}
