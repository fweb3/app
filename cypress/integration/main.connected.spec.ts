/// <reference types="cypress" />
export {}

const MOCK_TASK_STATE = {
  tokenBalance: '10000000000',
  hasEnoughTokens: false, // 1
  hasUsedFaucet: false, // 2
  hasSentTokens: false, // 3
  hasMintedNFT: false, // 4
  hasBurnedTokens: false, // 5
  hasSwappedTokens: false, // 6
  hasVotedInPoll: false, // 7
  hasDeployedContract: false, // 8
  hasWonGame: false,
  isConnected: true,
  trophyId: '',
  maticBalance: '',
}

describe('Desktop connected view', () => {
  it('displays connect button when query account is present', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', MOCK_TASK_STATE)
    cy.get('[data-testid="query-connect"]').should('be.visible')
    cy.get('[data-testid="header-logo"]').should('be.visible')
  })

  // Task 1
  it('lights up the isConnected dot', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', MOCK_TASK_STATE)
    cy.get('[data-testid="dot_dot-0-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-2"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-3"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-4"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-5"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-6"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-7"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_0"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_0"]').contains('Connect your wallet')
    cy.get('[data-testid="chest-tooltip-checkmark_0"]').should('be.visible')
  })
  // Task 2
  it('lights up has received enough tokens', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', { ...MOCK_TASK_STATE, hasEnoughTokens: true })
    cy.get('[data-testid="dot_dot-0-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-2"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-3"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-4"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-5"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-6"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-7"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_1-complete"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_1"]').contains('Get at least 300 FWEB3')
    cy.get('[data-testid="chest-tooltip-checkmark_1"]').should('be.visible')
  })

  // Task 3
  it('lights up received native tokens', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', {
      ...MOCK_TASK_STATE,
      tokenBalance: '300',
      hasEnoughTokens: true,
      hasUsedFaucet: true,
      maticBalance: '1',
    })
    cy.get('[data-testid="dot_dot-0-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-2-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-3"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-4"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-5"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-6"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-7"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_2-complete"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_2"]').contains('Get native token')
    cy.get('[data-testid="chest-tooltip-checkmark_2"]').should('be.visible')
  })

  // Task 4
  it('lights up has sent tokens', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', {
      ...MOCK_TASK_STATE,
      hasEnoughTokens: true,
      hasUsedFaucet: true,
      hasSentTokens: true,
    })
    cy.get('[data-testid="dot_dot-0-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-2-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-3-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-4"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-5"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-6"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-7"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_3-complete"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_3"]').contains('Send 100 FWEB3')
    cy.get('[data-testid="chest-tooltip-checkmark_3"]').should('be.visible')
  })

  // Task 5
  it('lights up has minted diamon nft', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', {
      ...MOCK_TASK_STATE,
      hasEnoughTokens: true,
      hasUsedFaucet: true,
      hasSentTokens: true,
      hasMintedNFT: true,
    })
    cy.get('[data-testid="dot_dot-0-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-2-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-3-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-4-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-5"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-6"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-7"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_4-complete"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_4"]').contains('Mint a FWEB3 NFT')
    cy.get('[data-testid="chest-tooltip-checkmark_4"]').should('be.visible')
  })

  // Task 6
  it('lights up has burned tokens', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', {
      ...MOCK_TASK_STATE,
      hasEnoughTokens: true,
      hasUsedFaucet: true,
      hasSentTokens: true,
      hasMintedNFT: true,
      hasBurnedTokens: true,
    })
    cy.get('[data-testid="dot_dot-0-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-2-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-3-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-4-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-5-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-6"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-7"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_5-complete"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_5"]').contains('Burn at least one')
    cy.get('[data-testid="chest-tooltip-checkmark_5"]').should('be.visible')
  })

  // Task 7
  it('lights up swap', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', {
      ...MOCK_TASK_STATE,
      hasEnoughTokens: true,
      hasUsedFaucet: true,
      hasSentTokens: true,
      hasMintedNFT: true,
      hasBurnedTokens: true,
      hasSwappedTokens: true,
    })
    cy.get('[data-testid="dot_dot-0-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-2-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-3-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-4-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-5-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-6-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-7"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_6-complete"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_6"]').contains('Swap a FWEB3')
    cy.get('[data-testid="chest-tooltip-checkmark_6"]').should('be.visible')
  })

  // Task 8
  it('lights up voted in poll', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', {
      ...MOCK_TASK_STATE,
      hasEnoughTokens: true,
      hasUsedFaucet: true,
      hasSentTokens: true,
      hasMintedNFT: true,
      hasBurnedTokens: true,
      hasSwappedTokens: true,
      hasVotedInPoll: true,
    })
    cy.get('[data-testid="dot_dot-0-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-1-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-2-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-3-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-4-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-5-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-6-visible"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-7-visible-active"]').should('have.css', 'opacity', '1')
    cy.get('[data-testid="dot_dot-8"]').should('have.css', 'opacity', '0')
    cy.get('[data-testid="game-tasks_7-complete"]').should('be.visible')
    cy.get('[data-testid="chest-tooltip_7"]').contains('Vote in a FWEB3')
    cy.get('[data-testid="chest-tooltip-checkmark_7"]').should('be.visible')
  })

  // Task 9
  it('opens chest when all tasks complete', () => {
    cy.visit('/?account=foobar')
    cy.intercept('/api/polygon*', {
      ...MOCK_TASK_STATE,
      hasEnoughTokens: true,
      hasUsedFaucet: true,
      hasSentTokens: true,
      hasMintedNFT: true,
      hasBurnedTokens: true,
      hasSwappedTokens: true,
      hasVotedInPoll: true,
      hasDeployedContract: true,
    })
    cy.get('[data-testid="open-chest"]').should('be.visible')
    cy.get('[data-testid="pulse-btn"]').contains('Claim')
  })
})
