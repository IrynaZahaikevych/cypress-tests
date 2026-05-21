class GaragePage {
  get addCarBtn() {
    return cy.contains('button', 'Add car');
  }
  get carItemName() {
    return cy.get('.car-item .car_name');
  }

  get modalTitle() {
    return cy.get('.modal-title');
  }
  get closeIcon() {
    return cy.get('.modal-header .close span');
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
  get cancelBtn() {
    return cy.get('.modal-footer .btn-secondary');
  }

  get mileageError() {
    return cy.get('.invalid-feedback');
  }
  get redColor() {
    return 'rgb(220, 53, 69)';
  }

  fillCarForm(brand, model, mileage) {
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.clear().type(mileage);
  }

  addCar(brand, model, mileage) {
    this.addCarBtn.click();
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.clear().type(mileage);
    this.submitAddCarBtn.should('not.be.disabled').click();
  }

  verifyMileageRequiredError() {
    this.addCarBtn.click();
    this.mileageInput.focus().blur();
    this.mileageError.should('be.visible').and('have.text', 'Mileage cost required');
    this.mileageInput.should('have.css', 'border-color').and('eq', this.redColor);
    this.submitAddCarBtn.should('be.disabled');
    this.cancelBtn.click();
  }
}

export const garagePage = new GaragePage();
