import { openRegistrationForm } from '../helpers/Registration.cy.js';
import { registrationPage } from '../PageObjects/RegistrationPage.js';

describe('Validation Re-enter Password field', () => {
  beforeEach(() => {
    openRegistrationForm();
  });

  it('Empty field — "Re-enter password required"', () => {
    registrationPage.passwordInput.type('Valid123');
    registrationPage.repeatPasswordInput.focus().blur();
    registrationPage.verifyValidationError(
      registrationPage.repeatPasswordInput,
      '#signupRepeatPassword',
      'Re-enter password required'
    );
  });

  it('Wrong data: Passwords do not match — Error', () => {
    registrationPage.passwordInput.type('Valid123');
    registrationPage.typeField(registrationPage.repeatPasswordInput, 'Different123');
    registrationPage.verifyValidationError(
      registrationPage.repeatPasswordInput,
      '#signupRepeatPassword',
      'Passwords do not match'
    );
  });

  it('Valid data: Passwords match — Success', () => {
    registrationPage.passwordInput.type('Valid123');
    registrationPage.typeField(registrationPage.repeatPasswordInput, 'Valid123');
    registrationPage.verifyValidationSuccess(
      registrationPage.repeatPasswordInput,
      '#signupRepeatPassword'
    );
  });
});
