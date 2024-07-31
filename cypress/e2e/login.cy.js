describe('Login', { testIsolation: false }, () => {
  before(() => {
    // ensure clean test slate for these tests
    cy.then(Cypress.session.clearCurrentSessionData)
  })

  it('should show application title', () => {
    cy.visit('/Dashboard')
    cy.get('.heading3', { timeout: 60000 }).each(($el) => {
      expect($el.text()).to.contain('Login')
    })
  })

  it('should login with valid credentials', () => {
    cy.get('input[type="text"].input.Mandatory').type(Cypress.env('USERNAME'))
    cy.get('input[type="password"].input').type(Cypress.env('PASSWORD'))
    cy.get('input[type="submit"].btn').click()
    cy.get('.font-size-h1', { timeout: 60000 }).should('contain', 'Home')
  })

})