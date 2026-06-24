import { garagePage } from '../PageObjects/GaragePage.js';

describe('Garage: Add Car Validation and Creation', () => {
  beforeEach(() => {
    cy.intercept({ url: Cypress.config('baseUrl') + '**' }, (req) => {
      req.headers['Authorization'] = 'Basic Z3Vlc3Q6d2VsY29tZTJxYXV0bw==';
    });

    cy.visit('/');

    cy.get('button.header_signin').click();
    cy.get('#signinEmail').type(Cypress.env('userEmail'));
    cy.get('#signinPassword').type(Cypress.env('userPassword'), { log: false });
    cy.get('.modal-footer .btn-primary').click();

    cy.url().should('include', '/panel/garage');
  });

  it('Step 1: Should open pop-up and verify layout elements', () => {
    garagePage.addCarBtn.click();
    garagePage.modalTitle.should('be.visible').and('have.text', 'Add a car');
    garagePage.closeIcon.should('be.visible');
    garagePage.cancelBtn.should('be.visible');
    garagePage.submitAddCarBtn.should('be.disabled');
  });

  it('Step 2: Should trigger validation error on empty mileage field', () => {
    garagePage.addCarBtn.click();
    garagePage.mileageInput.type('1').clear().blur();
    garagePage.mileageError.should('be.visible').and('have.text', 'Mileage cost required');
    garagePage.mileageInput.should('have.css', 'border-color').and('eq', garagePage.redColor);
    garagePage.submitAddCarBtn.should('be.disabled');
  });

  it('Step 3: Should close pop-up when Cancel button is clicked', () => {
    garagePage.addCarBtn.click();
    garagePage.cancelBtn.click();
    garagePage.modalTitle.should('not.exist');
  });

  it('Step 4: Should close pop-up when Close (X) icon is clicked', () => {
    garagePage.addCarBtn.click();
    garagePage.closeIcon.click();
    garagePage.modalTitle.should('not.exist');
  });

  it('Step 5: Should successfully add a new car and display it in the garage', () => {
    cy.intercept('POST', '**/api/cars').as('createCar');

    garagePage.addCarBtn.click();

    const brand = 'BMW';
    const model = 'X5';
    const uniqueMileage = Math.floor(Math.random() * 90000 + 10000).toString();

    garagePage.fillCarForm(brand, model, uniqueMileage);

    garagePage.submitAddCarBtn.click();

    cy.wait('@createCar');

    cy.get('.modal-content', { timeout: 3000 }).should('not.exist');

    cy.get('app-garage, main, .panel-page')
      .first()
      .within(() => {
        cy.get('input[name="miles"]')
          .filter((index, el) => Cypress.$(el).val() === uniqueMileage)
          .should('exist')
          .closest('.car-item')
          .find('.car_name')
          .should('have.text', 'BMW X5');
      });
  });
});
