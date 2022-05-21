/// <reference types="cypress" />

const WIN_STATE = {
  hasEnoughTokens: true,
  hasUsedFaucet: true,
  hasSwappedTokens: true,
  hasVotedInPoll: true,
  hasDeployedContract: true,
  hasSentTokens: true,
  hasBurnedTokens: true,
  hasMintedNFT: true,
  hasWonGame: true,
  trophyId: '1',
}

const DEFAULT_STATE = {
  hasEnoughTokens: false,
  hasUsedFaucet: false,
  hasSwappedTokens: false,
  hasVotedInPoll: false,
  hasDeployedContract: false,
  hasSentTokens: false,
  hasBurnedTokens: false,
  hasMintedNFT: false,
  hasWonGame: false,
}

const stubFn = () => {}

describe('Desktop view', () => {
  it('loads the connect page', () => {
    cy.visit('/')
  })
})
