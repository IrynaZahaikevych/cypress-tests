import { openRegistrationForm } from '../helpers/Registration.cy.js';

describe('Validation Re-enter Password field', () => {
  const passwordInput = '#signupPassword';
  const repeatPasswordInput = '#signupRepeatPassword';
  const redColor = 'rgb(220, 53, 69)';

  beforeEach(() => {
    openRegistrationForm();
  });

  it('Empty field — "Re-enter password required"', () => {
    cy.get(passwordInput).type('Valid123');
    cy.get(repeatPasswordInput).focus().blur();

    cy.get(`${repeatPasswordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Re-enter password required');

    cy.get(repeatPasswordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong data: Passwords do not match — Error', () => {
    cy.get(passwordInput).type('Valid123');
    cy.get(repeatPasswordInput).type('Different123').blur();

    cy.get(`${repeatPasswordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Passwords do not match');

    cy.get(repeatPasswordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Valid data: Passwords match — Success', () => {
    cy.get(passwordInput).type('Valid123');
    cy.get(repeatPasswordInput).type('Valid123').blur();

    cy.get(`${repeatPasswordInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(repeatPasswordInput).should('not.have.css', 'border-color', redColor);
  });
});
