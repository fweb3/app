describe.skip('metamask', () => {
  before(() => {
    cy.setupMetamask()
  })
  it('sets up metamask', async () => {
    // setup
    cy.visit('/')
  })
})

export {}
