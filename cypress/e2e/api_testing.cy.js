import { garagePage } from '../pageObjects/GaragePage.js';

describe('API testing with Cypress', () => {
  let createdCarId;
  const carBrand = 'BMW';
  const carModel = 'X5';
  const carMileage = '50000';

  const expenseData = {
    reportedAt: '2026-05-22',
    mileage: 50500,
    liters: 40,
    totalCost: 120,
  };

  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });

    const uniqueEmail = `user_${Date.now()}@test.com`;

    cy.request({
      method: 'POST',
      url: '/api/auth/signup',
      body: {
        name: 'QA',
        lastName: 'Engineer',
        email: uniqueEmail,
        password: 'Password123',
        repeatPassword: 'Password123',
      },
    }).then(() => {
      cy.contains('button', 'Sign In').click();
      cy.get('#signinEmail').type(uniqueEmail);
      cy.get('#signinPassword').type('Password123');
      cy.get('.modal-footer .btn-primary').click();

      cy.url().should('include', '/panel/garage');
    });
  });

  it('Full cycle: car creation, list validation, expense creation via API and UI check', () => {
    cy.intercept('POST', '/api/cars').as('createCarRequest');

    garagePage.addCarBtn.click();
    garagePage.fillCarForm(carBrand, carModel, carMileage);
    garagePage.submitAddCarBtn.click();

    cy.wait('@createCarRequest')
      .then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        createdCarId = interception.response.body.data.id;
        expect(createdCarId).to.be.a('number');
      })
      .then(() => {
        garagePage.modalContent.should('not.exist');
        garagePage.firstCarItem.should('contain.text', carBrand);

        cy.request('GET', '/api/cars').then((response) => {
          expect(response.status).to.eq(200);
          const createdCar = response.body.data.find((car) => car.id === createdCarId);
          expect(createdCar).to.exist;
          expect(createdCar.initialMileage).to.eq(Number(carMileage));
        });

        cy.createExpenseViaApi(createdCarId, expenseData).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data.carId).to.eq(createdCarId);
          expect(response.body.data.liters).to.eq(expenseData.liters);
        });

        garagePage.expensesNavBtn.click();
        cy.url().should('include', '/panel/expenses');

        cy.get('body').should('be.visible');
        cy.contains(expenseData.mileage).should('be.visible');
        cy.contains(expenseData.liters).should('be.visible');
        cy.contains(expenseData.totalCost).should('be.visible');
      });
  });
});
