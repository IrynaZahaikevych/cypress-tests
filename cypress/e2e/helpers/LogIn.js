export function loginAsGuest() {
  cy.intercept({ url: Cypress.config('baseUrl') + '**' }, (req) => {
    req.headers['Authorization'] = 'Basic Z3Vlc3Q6d2VsY29tZTJxYXV0bw==';
  });

  cy.visit('/');
  cy.contains('button', 'Guest log in').click();
  cy.url().should('include', '/panel/garage');
}
