class RegistrationPage {
  get nameInput() {
    return cy.get('#signupName');
  }
  get lastNameInput() {
    return cy.get('#signupLastName');
  }
  get emailInput() {
    return cy.get('#signupEmail');
  }
  get passwordInput() {
    return cy.get('#signupPassword');
  }
  get repeatPasswordInput() {
    return cy.get('#signupRepeatPassword');
  }
  get registerBtn() {
    return cy.contains('button.btn-primary', 'Register');
  }

  getErrorMessage(inputSelector) {
    return cy.get(`${inputSelector} ~ .invalid-feedback`);
  }

  get redColor() {
    return 'rgb(220, 53, 69)';
  }

  typeField(element, text) {
    element.clear().type(text).blur();
  }

  verifyValidationError(element, selectorStr, expectedText) {
    this.getErrorMessage(selectorStr).should('be.visible').and('have.text', expectedText);
    element.should('have.css', 'border-color').and('eq', this.redColor);
  }

  verifyValidationSuccess(element, selectorStr) {
    cy.get('body').then(($body) => {
      if ($body.find(`${selectorStr} ~ .invalid-feedback`).length > 0) {
        this.getErrorMessage(selectorStr).should('not.be.visible');
      }
    });

    element.should('have.css', 'border-color').and('not.eq', this.redColor);
  }
}

export const registrationPage = new RegistrationPage();
