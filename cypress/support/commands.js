Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://qauto.forstudy.space/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  cy.get('button.header_signin').should('be.visible').click();

  cy.get('.modal-content').should('be.visible');

  cy.get('#signinEmail').should('be.visible').clear().type(email);

  cy.get('#signinPassword').should('be.visible').clear().type(password, { sensitive: true });

  cy.get('.modal-footer button.btn-primary').contains('Login').click();

  cy.url().should('include', '/panel');
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});
