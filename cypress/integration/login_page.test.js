/// <reference types="Cypress" />

describe('The Login Page', () => {
	it('login with test user', () => {
		cy.intercept('GET', 'http://localhost:5000/posts?page=1', {
			fixture: 'posts.json',
		}).as('getPosts')

		cy.visit('http://localhost:3000/auth')
		cy.get('[data-cy="auth-email"]').type('tester@mail.com')
		cy.get('[data-cy="auth-password"]').type('123123')
		cy.get('[data-cy="auth-login-signup-button"]').click()
		cy.wait('@getPosts')
		cy.url().should('include', '/posts')
		cy.get('[data-cy="navbar-username"]').should('contain', 'tester tester')
		cy.visit('http://localhost:3000/auth')
		cy.wait('@getPosts')
		cy.url().should('include', '/posts')
		cy.get('[data-cy="navbar-logout-button"]').click()
		cy.get('[data-cy="form-login-to-create-a-post-message"]').should(
			'contain',
			'Please login to create a Post.'
		)
	})
})
