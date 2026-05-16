describe('Login via Custom Command', () => {
  it('should successfully login with valid credentials', () => {
    cy.login('izahaikevych@gmail.com', 'Iryska1405!');

    cy.get('h1').should('contain', 'Garage');
  });
});
