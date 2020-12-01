/* global cy */

describe('Logging in', () => {
  it('Logs in on click', () => {
    cy.visit('http://localhost:19006')

    cy.get('[role=button]')
      .click()

    cy.contains('LOGGED IN')
  })
})
