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
      cy.get('#error-message')
        .should('contain', 'invalid username or password')
        .and('have.css', 'background-color', 'rgb(253, 237, 237)');
    });
  });

  describe('when logged in', () => {
    beforeEach(function() {
      cy.login({username: 'ADA', password: 'password'});
    });

    it('a blog can be created', function() {
      cy.contains('new note').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('ADA');
      cy.get('#url').type('http://cypress.test');
      cy.get('#submit').click();
      cy.contains('a blog created by cypress');
    });

    describe.only('several blog exist', function() {
      beforeEach(function() {
        cy.createBlog({title: 'first blog', author: 'ADA', url: 'http://fire.com', likes: 3});
        cy.createBlog({title: 'second blog', author: 'ADA', url: 'http://blue.com', likes: 9});
        cy.createBlog({title: 'third blog', author: 'ADA', url: 'http://yellow.com', likes: 0});
      });

      it('users can like a blog', function() {
        cy.contains('third blog ADA').as('blog');
        cy.get('@blog').parent().find('#detailButton').click();
        cy.get('@blog').parent().contains('likes: 0');
        cy.get('@blog').parent().find('#likeButton').click();
        cy.get('@blog').parent().contains('likes: 1');
      });

      it('user who created the blog can delete it', function(){
        cy.contains('third blog ADA').as('blog');
        cy.get('@blog').parent().find('#detailButton').click();
        cy.get('@blog').parent().find('#deleteButton').click();
        cy.get('html').should('not.contain', 'third blog ADA');
      });
    });
  });

});

export {};