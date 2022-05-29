export {}

const ethereum = {}

describe('web3', () => {
  it.skip('mocks window.ethereum', () => {
    cy.visit('/')
    cy.get('[data-testid="onboarding-button"]').click()
  })
})
