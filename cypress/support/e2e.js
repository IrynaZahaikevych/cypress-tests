beforeEach(() => {
  cy.intercept('**', (req) => {
    req.headers['Authorization'] = 'Basic Z3Vlc3Q6d2VsY29tZTJxYXV0bw==';
  });
});
