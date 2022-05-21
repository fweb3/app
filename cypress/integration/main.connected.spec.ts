/// <reference types="cypress" />
export {}

describe('Desktop disconnected view', () => {
  before(() => {
    cy.visit('/')
  })
  it('loads the header', () => {
    cy.get('[data-testid="header_heading"]').contains('fweb3')
    cy.get('[data-testid="header__connect-msg"]').contains(
      'Connect a wallet to get started'
    )
  })
})
