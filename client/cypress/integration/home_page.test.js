/// <reference types="Cypress" />

describe('The Home Page', () => {
	it('successfully loads', () => {
		cy.visit('/')
	})
})

describe('Post Form', () => {
	it('create a new post', () => {
		cy.visit('/')
	})
})
