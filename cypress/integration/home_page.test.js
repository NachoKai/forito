/// <reference types="Cypress" />

describe('The Home Page', () => {
	it('successfully loads', () => {
		cy.visit('/')
	})
})

describe('Post Form', () => {
	it('create a new post', () => {
		cy.intercept('GET', 'http://localhost:5000/posts?page=1', {
			fixture: 'posts.json',
		}).as('getPosts')
		cy.intercept('GET', 'http://localhost:5000/posts/search?searchQuery=none&tags=test', {
			fixture: 'posts.json',
		}).as('searchPost')

		cy.visit('/auth')
		cy.get('[data-cy="auth-email"]').type('tester@mail.com')
		cy.get('[data-cy="auth-password"]').type('123123')
		cy.get('[data-cy="auth-login-signup-button"]').click()
		cy.wait('@getPosts')
		cy.url().should('include', '/posts')
		cy.get('[data-cy="form-title"]').type('Test Title')
		cy.get('[data-cy="form-message"]').type('Test Message')
		cy.get('[data-cy="form-tags"]').type('test')
		cy.get('[data-cy="form-submit-button"]').click()
		cy.wait('@searchPost')
		cy.get('[data-cy="post-details-title"]').should('contain', 'Test Title')
		cy.get('[data-cy="post-details-message"]').should('contain', 'Test Message')
		cy.get('[data-cy="post-details-tags"]').should('contain', 'test')
	})
})
