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
})
