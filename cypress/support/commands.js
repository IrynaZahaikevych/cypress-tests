Cypress.Commands.add('createExpenseViaApi', (carId, expenseData) => {
  const requestBody = {
    carId: Number(carId),
    reportedAt: typeof expenseData.reportedAt === 'string' ? expenseData.reportedAt : expenseData.reportedAt[0],
    mileage: Number(expenseData.mileage),
    liters: Number(expenseData.liters),
    totalCost: Number(expenseData.totalCost)
  };

  cy.log('SENDING EXPENSE BODY:', JSON.stringify(requestBody));

  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    failOnStatusCode: false,
    body: requestBody
  });
});
