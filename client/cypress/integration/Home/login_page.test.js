/// <reference types="Cypress" />

describe('The Login Page', () => {
	it('login with test user', () => {
		cy.visit('/auth')
		cy.get('[data-cy="auth-email"]').type('tester@mail.com')
		cy.get('[data-cy="auth-password"]').type('123123')
		cy.get('[data-cy="auth-login-signup-button"]').click()
		cy.url().should('include', '/posts')
		cy.get('[data-cy="navbar-username"]').should('contain', 'tester tester')
		cy.visit('/auth')
		cy.url().should('include', '/posts')
		cy.get('[data-cy="navbar-logout-button"]').click()
		cy.get('[data-cy="form-login-to-create-a-post-message"]').should(
			'contain',
			'Please login to create a Post.'
		)
	})
})
