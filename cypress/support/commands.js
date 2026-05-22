Cypress.Commands.add('createExpenseViaApi', (carId, expenseData) => {
  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    failOnStatusCode: false,
    body: {
      carId: carId,
      reportedAt: expenseData.reportedAt,
      mileage: expenseData.mileage,
      liters: expenseData.liters,
      totalCost: expenseData.totalCost,
    },
  });
});
