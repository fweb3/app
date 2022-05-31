export {}
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      setupMetamask(): Chainable<any>
    }
  }
}
