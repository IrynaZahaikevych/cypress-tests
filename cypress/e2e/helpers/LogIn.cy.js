export function loginAsGuest() {
  const cleanUrl = Cypress.config('baseUrl');

  const authUrl = cleanUrl.replace('https://', 'https://guest:welcome2qauto@');

  cy.visit(authUrl);

  cy.contains('Do more!').should('be.visible');
}
