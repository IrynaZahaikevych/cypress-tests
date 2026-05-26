class GaragePage {
  get addCarBtn() {
    return cy.contains('button', 'Add car');
  }

  get brandSelect() {
    return cy.get('#addCarBrand');
  }

  get modelSelect() {
    return cy.get('#addCarModel');
  }

  get mileageInput() {
    return cy.get('#addCarMileage');
  }

  get submitAddCarBtn() {
    return cy.get('.modal-footer .btn-primary');
  }

  get modalContent() {
    return cy.get('.modal-content');
  }

  get firstCarItem() {
    return cy.get('.car-item').first();
  }

  get expensesNavBtn() {
    return cy.get('a[href="/panel/expenses"]').first();
  }

  get expensesTable() {
    return cy.get('.expenses-table');
  }

  get mainPanelPage() {
    return cy.get('main, .panel-page');
  }

  fillCarForm(brand, model, mileage) {
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.clear().type(mileage);
  }
}

export const garagePage = new GaragePage();
