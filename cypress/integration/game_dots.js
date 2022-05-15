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

describe('Game completion dots', () => {
  it('load the default page', () => {
    cy.visit('/')
    cy.get('.game-tile').should('be.visible')
    cy.get('.game-tile').should('have.length', 9)
    cy.get('.game-tile.completed').should('have.length', 0)
  })
  it.skip('should bypass metamask and ethers correctly', () => {
    // cy.intercept('/api/polygon*', WIN_STATE)
    // cy.visit('/', {
    //   onBeforeLoad: (win) => {
    //     win.ethereum = {
    //       on: () => {},
    //       removeListener: () => {},
    //     }
    //   },
    // })
    // cy.get('[data-testid=connect-btn]').click()
    // cy.wait(0)
  })
  // it("loads a wallet that is complete", () => {
  //   cy.stub(ethers.providers, 'Web3Provider')
  //   // cy.intercept('/api/polygon*', WIN_STATE)
  //   cy.visit("/?wallet=0x2A9d8CfD86796E6A68AF9c83FD90F67CcaF1352c");
  //   // cy.contains('Connect').click()
  //   // cy.get(".game-tile.completed").should("have.length", 9);
  // });

  it('load a wallet that has not completed anything', () => {
    cy.visit('/')
    cy.get('.game-tile').should('be.visible')
    cy.get('.game-tile').should('have.length', 9)
    cy.get('.game-tile.completed').should('have.length', 0)
  })
})
