describe('BlogList', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'ADA',
      name: 'Ada Wong',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('log in to application');
    cy.contains('login');
  });

  describe('Login', function() {
    it('succeeds with correct with credentials', function() {
      cy.get('#username').type('ADA');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
      cy.contains('Ada Wong logged-in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ADA');
      cy.get('#password').type('osakanaoisii');
      cy.get('#login-button').click();
      cy.contains('invalid username or password');
    });
  });
});

export {};