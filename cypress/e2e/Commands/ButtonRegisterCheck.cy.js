import { openRegistrationForm } from '../helpers/Registration.cy.js';
import { registrationPage } from '../PageObjects/RegistrationPage.js';

describe('Validation Register button', () => {
  beforeEach(() => {
    openRegistrationForm();
  });

  it('The button is disabled if data incorrect — Success', () => {
    registrationPage.nameInput.type('Iryna');
    registrationPage.lastNameInput.type('Zahaikevych');
    registrationPage.emailInput.type('izahaikevych@gmail.com');
    registrationPage.passwordInput.type('123');
    registrationPage.repeatPasswordInput.type('123').blur();

    registrationPage.registerBtn.should('be.disabled');
  });

  it('When the user clicks on button the new user will be created — Success', () => {
    const uniqueEmail = `test.user.${Date.now()}@example.com`;

    registrationPage.nameInput.type('Iryna');
    registrationPage.lastNameInput.type('Zahaikevych');
    registrationPage.emailInput.type(uniqueEmail);
    registrationPage.passwordInput.type('ValidPass123');
    registrationPage.repeatPasswordInput.type('ValidPass123').blur();

    registrationPage.registerBtn.should('not.be.disabled').click();

    cy.url().should('include', '/panel');
  });
});
