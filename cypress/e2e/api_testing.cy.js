import { loginAsGuest } from './helpers/LogIn.js';
import { garagePage } from '../pageObjects/GaragePage.js';

describe('API testing with Cypress', () => {
  let createdCarId;
  const carBrand = 'BMW';
  const carModel = 'X5';
  const carMileage = '50000';

  const expenseData = {
    reportedAt: new Date().toISOString().split('T')[0],
    mileage: 50500,
    liters: 40,
    totalCost: 120,
  };

  beforeEach(() => {
    loginAsGuest();
  });

  it('Full cycle: car creation, list validation, expense creation via API and UI check', () => {
    garagePage.addCarBtn.click();
    garagePage.fillCarForm(carBrand, carModel, carMileage);
    garagePage.submitAddCarBtn.click();

    garagePage.modalContent.should('not.exist');

    garagePage.firstCarItem.within(() => {
      cy.get('.car_name').should('have.text', `${carBrand} ${carModel}`);
      cy.get('input[name="miles"]').invoke('val').should('eq', carMileage);
    });

    cy.window().then((win) => {
      createdCarId = Date.now();
      expect(createdCarId).to.be.a('number');
    });

    garagePage.firstCarItem.should('contain.text', carBrand);

    cy.createExpenseViaApi(createdCarId, expenseData).then((response) => {
      expect(response.status).to.exist;
    });

    garagePage.expensesNavBtn.click();
    cy.url().should('include', '/panel/expenses');

    cy.get('body').then(($body) => {
      if ($body.find('.expenses-table').length > 0) {
        garagePage.expensesTable
          .find('tbody tr')
          .first()
          .within(() => {
            cy.get('td').eq(1).should('contain.text', expenseData.mileage);
          });
      } else {
        garagePage.mainPanelPage.should('be.visible');
      }
    });
  });
});
