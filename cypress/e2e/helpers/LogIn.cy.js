export function loginAsGuest() {
  cy.visit('https://qauto.forstudy.space/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  cy.contains('Do more!').should('be.visible');
}
