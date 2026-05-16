import { openRegistrationForm } from '../helpers/Registration.cy.js';

describe('Validation Register button', () => {
  const registerBtnSelector = 'button.btn-primary';

  beforeEach(() => {
    openRegistrationForm();
  });

  it('The button is disabled if data incorrect — Success', () => {
    cy.get('#signupName').type('Iryna');
    cy.get('#signupLastName').type('Zahaikevych');
    cy.get('#signupEmail').type('izahaikevych@gmail.com');
    cy.get('#signupPassword').type('123');
    cy.get('#signupRepeatPassword').type('123').blur();

    cy.contains(registerBtnSelector, 'Register').should('be.disabled');
  });

  it('When the user clicks on button the new user will be created — Success', () => {
    const uniqueEmail = `test.user.${Date.now()}@example.com`;

    cy.get('#signupName').type('Iryna');
    cy.get('#signupLastName').type('Zahaikevych');
    cy.get('#signupEmail').type(uniqueEmail);
    cy.get('#signupPassword').type('ValidPass123');
    cy.get('#signupRepeatPassword').type('ValidPass123').blur();

    cy.contains(registerBtnSelector, 'Register').should('not.be.disabled');

    cy.contains(registerBtnSelector, 'Register').click();

    cy.url().should('include', '/panel');
  });
});
