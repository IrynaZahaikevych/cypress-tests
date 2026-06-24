import { garagePage } from '../PageObjects/GaragePage.js';
import { fuelExpensesPage } from '../PageObjects/FuelExpensesPage.js';

describe('Garage: Fuel Expenses Validation and Creation', () => {
  let initialMileage;

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

    initialMileage = Math.floor(Math.random() * 50000 + 10000);

    garagePage.addCar('BMW', 'X5', initialMileage.toString());

    cy.get('.modal-content', { timeout: 4000 }).should('not.exist');
  });

  it('Step 1: Should open expense pop-up and verify layout elements', () => {
    fuelExpensesPage.addFuelExpenseBtn.first().click();

    fuelExpensesPage.modalTitle.should('be.visible').and('have.text', 'Add an expense');
    fuelExpensesPage.closeIcon.should('be.visible');
    fuelExpensesPage.cancelBtn.should('be.visible');

    fuelExpensesPage.carSelect.should('be.visible');
  });

  it('Step 2: Should trigger validation error on empty fields', () => {
    fuelExpensesPage.addFuelExpenseBtn.first().click();

    fuelExpensesPage.litersInput.focus().blur();

    fuelExpensesPage.errorFeedback.should('be.visible');
    fuelExpensesPage.litersInput
      .should('have.css', 'border-color')
      .and('eq', fuelExpensesPage.redColor);
  });

  it('Step 3: Should close pop-up when Cancel button is clicked', () => {
    fuelExpensesPage.addFuelExpenseBtn.first().click();
    fuelExpensesPage.cancelBtn.click();
    fuelExpensesPage.modalTitle.should('not.exist');
  });

  it('Step 4: Should close pop-up when Close (X) icon is clicked', () => {
    fuelExpensesPage.addFuelExpenseBtn.first().click();
    fuelExpensesPage.closeIcon.click();
    fuelExpensesPage.modalTitle.should('not.exist');
  });

  it('Step 5: Should successfully add fuel expense and verify it on the expenses page', () => {
    cy.intercept('POST', '**/api/expenses').as('createExpense');

    fuelExpensesPage.addFuelExpenseBtn.first().click();

    const newMileage = initialMileage + 500;
    const liters = '45';
    const totalCost = '1800';

    fuelExpensesPage.fillExpenseForm(newMileage.toString(), liters, totalCost);

    fuelExpensesPage.submitExpenseBtn.click();

    cy.wait('@createExpense').its('response.statusCode').should('eq', 200);

    cy.get('.modal-content', { timeout: 4000 }).should('not.exist');

    cy.visit('/panel/expenses');

    cy.contains('.table tbody tr', newMileage.toString()).within(() => {
      cy.root().should('contain', `${liters}L`).and('contain', `${totalCost}.00 USD`);
    });
  });
});
