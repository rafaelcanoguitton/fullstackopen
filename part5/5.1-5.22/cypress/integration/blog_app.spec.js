describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST','http://localhost:3003/api/users/',{
        username:'Rafael',
        password:'Fullstack'
    })
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.get('input:first').type('Rafael')
        cy.get('input:last').type('Fullstack')
        cy.contains('login').click()
        cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('input:first').type('test')
        cy.get('input:last').type('nouser')
        cy.contains('login').click()
        cy.contains('Wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
        cy.get('input:first').type('Rafael')
        cy.get('input:last').type('Fullstack')
        cy.contains('login').click()
    })

    it('A blog can be created', function() {
        cy.contains('New blog').click()
        cy.get('#Title').type('Somepost')
        cy.get('#Author').type('WithSomeAuthor')
        cy.get('#Url').type('AndSomeUrl')
        cy.contains('create').click()
        cy.contains('Somepost')
    })
  })
})
