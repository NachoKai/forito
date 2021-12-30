/// <reference types="Cypress" />

describe('The Home Page', () => {
	it('successfully loads', () => {
		cy.visit('/')
	})
})
