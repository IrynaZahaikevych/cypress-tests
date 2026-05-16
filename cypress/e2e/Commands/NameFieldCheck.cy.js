import { openRegistrationForm } from '../helpers/Registration.cy.js';

describe('Validation Name field', () => {
  const nameInput = '#signupName';
  const redColor = 'rgb(220, 53, 69)';

  beforeEach(() => {
    openRegistrationForm();
  });

  const typeData = (text) => {
    cy.get(nameInput).clear().type(text).blur();
  };

  it('Mandatory: Yes — "Name is required"', () => {
    cy.get(nameInput).focus().blur();

    cy.get(`${nameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Name required');

    cy.get(nameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong data — "Name is invalid"', () => {
    typeData('Іван');

    cy.get(`${nameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Name is invalid');

    cy.get(nameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong length min — "Name has to be from 2 to 20 characters long"', () => {
    typeData('A');

    cy.get(`${nameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Name has to be from 2 to 20 characters long');

    cy.get(nameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Wrong length max — "Name has to be from 2 to 20 characters long"', () => {
    const longText = 'A'.repeat(21);
    typeData(longText);

    cy.get(`${nameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Name has to be from 2 to 20 characters long');

    cy.get(nameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Trim check: Field with spaces only — "Name is invalid"', () => {
    typeData('   ');

    cy.get(`${nameInput} ~ .invalid-feedback`)
      .should('be.visible')
      .and('have.text', 'Name is invalid');

    cy.get(nameInput).should('have.css', 'border-color').and('eq', redColor);
  });

  it('Trim check: Valid name with spaces along borders — Success', () => {
    typeData('  Ab  ');

    cy.get(`${nameInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(nameInput).should('not.have.css', 'border-color', redColor);
  });

  it('Boundary check: Min length 2 characters — Success', () => {
    typeData('Ab');

    cy.get(`${nameInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(nameInput).should('not.have.css', 'border-color', redColor);
  });

  it('Boundary check: Max length 20 characters — Success', () => {
    const validMaxText = 'A'.repeat(20);
    typeData(validMaxText);

    cy.get(`${nameInput} ~ .invalid-feedback`).should('not.exist');
    cy.get(nameInput).should('not.have.css', 'border-color', redColor);
  });
});
