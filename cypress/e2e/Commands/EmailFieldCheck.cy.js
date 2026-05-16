import { openRegistrationForm } from '../helpers/Registration.cy.js';

describe('Validation Email field', () => {
  const emailInput = '#signupEmail';
  const redColor = 'rgb(220, 53, 69)';

  beforeEach(() => {
    openRegistrationForm();
  });

  const typeData = (text) => {
    cy.get(emailInput).clear().type(text).blur();
  };

  it('Empty field — "Email required"', () => {
    cy.get(emailInput).focus().blur();

    cy.get(`${emailInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Email required');

    cy.get(emailInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong data — "Email is incorrect"', () => {
    typeData('invalid-email.com');

    cy.get(`${emailInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Email is incorrect');

    cy.get(emailInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Trim check: Field with spaces only — "Email required"', () => {
    typeData('   ');

    cy.get(`${emailInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Email is incorrect');

    cy.get(emailInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Standard validation: Valid email — Success', () => {
    typeData('test.user@example.com');

    cy.get(`${emailInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(emailInput).should('not.have.css', 'border-color', redColor);
  });
});
