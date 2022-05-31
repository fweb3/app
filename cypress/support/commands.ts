Cypress.Commands.add('setupMetamask', () => {
  return cy.task('setupMetamask')
})

// Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message))
