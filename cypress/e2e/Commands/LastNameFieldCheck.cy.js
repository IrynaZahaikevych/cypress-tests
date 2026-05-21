import { openRegistrationForm } from '../helpers/Registration.cy.js';
import { registrationPage } from '../PageObjects/RegistrationPage.js';

describe('Validation Last Name field', () => {
  beforeEach(() => {
    openRegistrationForm();
  });

  it('Mandatory: Yes — "Last Name is required"', () => {
    registrationPage.lastNameInput.focus().blur();
    registrationPage.verifyValidationError(
      registrationPage.lastNameInput,
      '#signupLastName',
      'Last name required'
    );
  });

  it('Wrong data — "Last Name is invalid"', () => {
    registrationPage.typeField(registrationPage.lastNameInput, 'Іван');
    registrationPage.verifyValidationError(
      registrationPage.lastNameInput,
      '#signupLastName',
      'Last name is invalid'
    );
  });

  it('Wrong length min — "Last Name has to be from 2 to 20 characters long"', () => {
    registrationPage.typeField(registrationPage.lastNameInput, 'A');
    registrationPage.verifyValidationError(
      registrationPage.lastNameInput,
      '#signupLastName',
      'Last name has to be from 2 to 20 characters long'
    );
  });

  it('Wrong length max — "Last Name has to be from 2 to 20 characters long"', () => {
    registrationPage.typeField(registrationPage.lastNameInput, 'A'.repeat(21));
    registrationPage.verifyValidationError(
      registrationPage.lastNameInput,
      '#signupLastName',
      'Last name has to be from 2 to 20 characters long'
    );
  });

  it('Trim check: Field with spaces only — "Last Name is invalid"', () => {
    registrationPage.typeField(registrationPage.lastNameInput, '   ');
    registrationPage.verifyValidationError(
      registrationPage.lastNameInput,
      '#signupLastName',
      'Last name is invalid'
    );
  });

  it('Trim check: Valid name with spaces along borders — Success', () => {
    registrationPage.typeField(registrationPage.lastNameInput, '  Ab  ');
    registrationPage.verifyValidationSuccess(registrationPage.lastNameInput, '#signupLastName');
  });

  it('Boundary check: Min length 2 characters — Success', () => {
    registrationPage.typeField(registrationPage.lastNameInput, 'Ab');
    registrationPage.verifyValidationSuccess(registrationPage.lastNameInput, '#signupLastName');
  });

  it('Boundary check: Max length 20 characters — Success', () => {
    registrationPage.typeField(registrationPage.lastNameInput, 'A'.repeat(20));
    registrationPage.verifyValidationSuccess(registrationPage.lastNameInput, '#signupLastName');
  });
});
