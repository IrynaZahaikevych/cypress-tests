import { openRegistrationForm } from '../helpers/Registration.cy.js';

describe('Validation Password field', () => {
  const passwordInput = '#signupPassword';
  const redColor = 'rgb(220, 53, 69)';
  const errorMessage =
    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

  beforeEach(() => {
    openRegistrationForm();
  });

  const typeData = (text) => {
    cy.get(passwordInput).clear().type(text).blur();
  };

  it('Empty field — "Password required"', () => {
    cy.get(passwordInput).focus().blur();

    cy.get(`${passwordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Password required');

    cy.get(passwordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong data: Missing integer — Error', () => {
    typeData('ValidPass');

    cy.get(`${passwordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', errorMessage);

    cy.get(passwordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong data: Missing capital letter — Error', () => {
    typeData('valid123');

    cy.get(`${passwordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', errorMessage);

    cy.get(passwordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong data: Missing small letter — Error', () => {
    typeData('VALID123');

    cy.get(`${passwordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', errorMessage);

    cy.get(passwordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong length min: 7 characters — Error', () => {
    typeData('Pass123');

    cy.get(`${passwordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', errorMessage);

    cy.get(passwordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong length max: 16 characters — Error', () => {
    typeData('Pass123456789012');

    cy.get(`${passwordInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', errorMessage);

    cy.get(passwordInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Boundary check: Min length 8 characters — Success', () => {
    typeData('Valid123');

    cy.get(`${passwordInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(passwordInput).should('not.have.css', 'border-color', redColor);
  });

  it('Boundary check: Max length 15 characters — Success', () => {
    typeData('ValidPass123456');

    cy.get(`${passwordInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(passwordInput).should('not.have.css', 'border-color', redColor);
  });
});
