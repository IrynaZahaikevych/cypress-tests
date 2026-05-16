import { openRegistrationForm } from '../helpers/Registration.cy.js';

describe('Validation Last Name field', () => {
  const lastNameInput = '#signupLastName';
  const redColor = 'rgb(220, 53, 69)';

  beforeEach(() => {
    openRegistrationForm();
  });

  const typeData = (text) => {
    cy.get(lastNameInput).clear().type(text).blur();
  };

  it('Mandatory: Yes — "Last Name is required"', () => {
    cy.get(lastNameInput).focus().blur();

    cy.get(`${lastNameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Last name required');

    cy.get(lastNameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong data — "Last Name is invalid"', () => {
    typeData('Іван');

    cy.get(`${lastNameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Last name is invalid');

    cy.get(lastNameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong length min — "Last Name has to be from 2 to 20 characters long"', () => {
    typeData('A');

    cy.get(`${lastNameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Last name has to be from 2 to 20 characters long');

    cy.get(lastNameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong length max — "Last Name has to be from 2 to 20 characters long"', () => {
    const longText = 'A'.repeat(21);
    typeData(longText);

    cy.get(`${lastNameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Last name has to be from 2 to 20 characters long');

    cy.get(lastNameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Trim check: Field with spaces only — "Last Name is invalid"', () => {
    typeData('   ');

    cy.get(`${lastNameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Last name is invalid');

    cy.get(lastNameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Trim check: Valid name with spaces along borders — Success', () => {
    typeData('  Ab  ');

    cy.get(`${lastNameInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(lastNameInput).should('not.have.css', 'border-color', redColor);
  });

  it('Boundary check: Min length 2 characters — Success', () => {
    typeData('Ab');

    cy.get(`${lastNameInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(lastNameInput).should('not.have.css', 'border-color', redColor);
  });

  it('Boundary check: Max length 20 characters — Success', () => {
    const validMaxText = 'A'.repeat(20);
    typeData(validMaxText);

    cy.get(`${lastNameInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(lastNameInput).should('not.have.css', 'border-color', redColor);
  });
});
