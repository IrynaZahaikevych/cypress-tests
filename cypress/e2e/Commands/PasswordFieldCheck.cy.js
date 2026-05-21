import { openRegistrationForm } from '../helpers/Registration.cy.js';
import { registrationPage } from '../PageObjects/RegistrationPage.js';

describe('Validation Password field', () => {
  const errorMessage =
    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

  beforeEach(() => {
    openRegistrationForm();
  });

  it('Empty field — "Password required"', () => {
    registrationPage.passwordInput.focus().blur();
    registrationPage.verifyValidationError(
      registrationPage.passwordInput,
      '#signupPassword',
      'Password required'
    );
  });

  it('Wrong data: Missing integer — Error', () => {
    registrationPage.typeField(registrationPage.passwordInput, 'ValidPass');
    registrationPage.verifyValidationError(
      registrationPage.passwordInput,
      '#signupPassword',
      errorMessage
    );
  });

  it('Wrong data: Missing capital letter — Error', () => {
    registrationPage.typeField(registrationPage.passwordInput, 'valid123');
    registrationPage.verifyValidationError(
      registrationPage.passwordInput,
      '#signupPassword',
      errorMessage
    );
  });

  it('Wrong data: Missing small letter — Error', () => {
    registrationPage.typeField(registrationPage.passwordInput, 'VALID123');
    registrationPage.verifyValidationError(
      registrationPage.passwordInput,
      '#signupPassword',
      errorMessage
    );
  });

  it('Wrong length min: 7 characters — Error', () => {
    registrationPage.typeField(registrationPage.passwordInput, 'Pass123');
    registrationPage.verifyValidationError(
      registrationPage.passwordInput,
      '#signupPassword',
      errorMessage
    );
  });

  it('Wrong length max: 16 characters — Error', () => {
    registrationPage.typeField(registrationPage.passwordInput, 'Pass123456789012');
    registrationPage.verifyValidationError(
      registrationPage.passwordInput,
      '#signupPassword',
      errorMessage
    );
  });

  it('Boundary check: Min length 8 characters — Success', () => {
    registrationPage.typeField(registrationPage.passwordInput, 'Valid123');
    registrationPage.verifyValidationSuccess(registrationPage.passwordInput, '#signupPassword');
  });

  it('Boundary check: Max length 15 characters — Success', () => {
    registrationPage.typeField(registrationPage.passwordInput, 'ValidPass123456');
    registrationPage.verifyValidationSuccess(registrationPage.passwordInput, '#signupPassword');
  });
});
