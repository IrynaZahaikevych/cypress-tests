import { openRegistrationForm } from '../helpers/Registration.cy.js';
import { registrationPage } from '../PageObjects/RegistrationPage.js';

describe('Validation Email field', () => {
  beforeEach(() => {
    openRegistrationForm();
  });

  it('Empty field — "Email required"', () => {
    registrationPage.emailInput.focus().blur();
    registrationPage.verifyValidationError(
      registrationPage.emailInput,
      '#signupEmail',
      'Email required'
    );
  });

  it('Wrong data — "Email is incorrect"', () => {
    registrationPage.typeField(registrationPage.emailInput, 'invalid-email.com');
    registrationPage.verifyValidationError(
      registrationPage.emailInput,
      '#signupEmail',
      'Email is incorrect'
    );
  });

  it('Trim check: Field with spaces only — "Email required"', () => {
    registrationPage.typeField(registrationPage.emailInput, '   ');
    registrationPage.verifyValidationError(
      registrationPage.emailInput,
      '#signupEmail',
      'Email is incorrect'
    );
  });

  it('Standard validation: Valid email — Success', () => {
    registrationPage.typeField(registrationPage.emailInput, 'test.user@example.com');
    registrationPage.verifyValidationSuccess(registrationPage.emailInput, '#signupEmail');
  });
});
