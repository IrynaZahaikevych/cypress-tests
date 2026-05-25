class FuelExpensesPage {
  get addFuelExpenseBtn() {
    return cy.get('button.car_add-expense');
  }

  get modalTitle() {
    return cy.get('.modal-title');
  }

  get closeIcon() {
    return cy.get('.modal-header .close span');
  }

  get carSelect() {
    return cy.get('#addExpenseCar');
  }

  get dateInput() {
    return cy.get('#addExpenseDate');
  }

  get mileageInput() {
    return cy.get('#addExpenseMileage');
  }

  get litersInput() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitExpenseBtn() {
    return cy.get('.modal-footer').contains('button', 'Add');
  }

  get cancelBtn() {
    return cy.contains('button', 'Cancel');
  }

  get errorFeedback() {
    return cy.get('.invalid-feedback');
  }

  get redColor() {
    return 'rgb(220, 53, 69)';
  }

  fillExpenseForm(mileage, liters, totalCost) {
    this.mileageInput.clear().type(mileage);
    this.litersInput.clear().type(liters);
    this.totalCostInput.clear().type(totalCost);
  }
}

export const fuelExpensesPage = new FuelExpensesPage();
