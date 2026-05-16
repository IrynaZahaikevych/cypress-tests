export function openRegistrationForm() {
  cy.visit('https://qauto.forstudy.space/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  cy.contains('Do more!').should('be.visible');

  cy.get('button.header_signin').should('be.visible').click();

  cy.get('.modal-content button.btn-link').contains('Registration').should('be.visible').click();

  cy.get('.modal-title').should('have.text', 'Registration');
}
