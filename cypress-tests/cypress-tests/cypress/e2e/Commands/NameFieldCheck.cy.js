import { openRegistrationForm } from '../helpers/Registration.cy.js';
import { registrationPage } from '../PageObjects/RegistrationPage.js';

describe('Validation Name field', () => {
  beforeEach(() => {
    openRegistrationForm();
  });

  it('Mandatory: Yes — "Name is required"', () => {
    registrationPage.nameInput.focus().blur();
    registrationPage.verifyValidationError(
      registrationPage.nameInput,
      '#signupName',
      'Name required'
    );
  });

  it('Wrong data — "Name is invalid"', () => {
    registrationPage.typeField(registrationPage.nameInput, 'Іван');
    registrationPage.verifyValidationError(
      registrationPage.nameInput,
      '#signupName',
      'Name is invalid'
    );
  });

  it('Wrong length min — "Name has to be from 2 to 20 characters long"', () => {
    registrationPage.typeField(registrationPage.nameInput, 'A');
    registrationPage.verifyValidationError(
      registrationPage.nameInput,
      '#signupName',
      'Name has to be from 2 to 20 characters long'
    );
  });

  it('Wrong length max — "Name has to be from 2 to 20 characters long"', () => {
    registrationPage.typeField(registrationPage.nameInput, 'A'.repeat(21));
    registrationPage.verifyValidationError(
      registrationPage.nameInput,
      '#signupName',
      'Name has to be from 2 to 20 characters long'
    );
  });

  it('Trim check: Field with spaces only — "Name is invalid"', () => {
    registrationPage.typeField(registrationPage.nameInput, '   ');
    registrationPage.verifyValidationError(
      registrationPage.nameInput,
      '#signupName',
      'Name is invalid'
    );
  });

  it('Trim check: Valid name with spaces along borders — Success', () => {
    registrationPage.nameInput.clear().type('  Ab  ').blur();
    registrationPage.verifyValidationSuccess(registrationPage.nameInput, '#signupName');
  });

  it('Boundary check: Min length 2 characters — Success', () => {
    registrationPage.typeField(registrationPage.nameInput, 'Ab');
    registrationPage.verifyValidationSuccess(registrationPage.nameInput, '#signupName');
  });

  it('Boundary check: Max length 20 characters — Success', () => {
    registrationPage.typeField(registrationPage.nameInput, 'A'.repeat(20));
    registrationPage.verifyValidationSuccess(registrationPage.nameInput, '#signupName');
  });
});
