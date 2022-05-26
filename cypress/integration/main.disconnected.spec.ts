/// <reference types="cypress" />
export {}

describe('Desktop disconnected view', () => {
  before(() => {
    cy.visit('/')
  })
  it('loads the header', () => {
    cy.get('[data-testid="header_heading"]').contains('fweb3')
    cy.get('[data-testid="header_connect-msg"]').contains(
      'Connect a wallet to get started'
    )
  })

  it('loads the main chest without dots', () => {
    cy.get('[data-testid="chest"]').should('exist')
    cy.get('[data-testid="chest-section_dot"]').should('not.exist')
  })

  it('shows intro text', () => {
    cy.get('[data-testid="section-introduction"]').should('be.visible')
  })

  it('loads the connect button', () => {
    cy.get('[data-testid="pulse-btn"]').contains('Connect')
  })

  it('loads the footer text', () => {
    cy.get('[data-testid="footer_footer"]').should('be.visible')
  })
})
