import React from 'react'
import userEvent from '@testing-library/user-event'

import { Auth } from '../components/Auth'
import { render, screen } from './test-utils'

describe('Auth', () => {
	test('Renders component Login sections', () => {
		render(<Auth />)
		const loginTitle = screen.getAllByText(/login/i)[0]
		const emailLabel = screen.getByText(/email/i)
		const emailInput = screen.getByRole('textbox', { name: /email/i })
		const passwordLabel = screen.getByText(/password/i)
		const passwordInput = screen.getByLabelText(/password/i)
		const loginButton = screen.getAllByRole('button', { name: /login/i })[0]
		const googleLoginButton = screen.getByRole('button', { name: /google login/i })
		const switchButton = screen.getByRole('button', {
			name: /don't have an account\? sign up/i,
		})

		expect(loginTitle).toBeInTheDocument()
		expect(emailLabel).toBeInTheDocument()
		expect(emailInput).toBeInTheDocument()
		expect(passwordLabel).toBeInTheDocument()
		expect(passwordInput).toBeInTheDocument()
		expect(loginButton).toBeInTheDocument()
		expect(googleLoginButton).toBeInTheDocument()
		expect(switchButton).toBeInTheDocument()
	})

	test('Renders component Sign Up sections', async () => {
		render(<Auth />)
		const switchButton = screen.getByRole('button', {
			name: /don't have an account\? sign up/i,
		})

		await userEvent.click(switchButton)
		const signUpTitle = screen.getAllByText(/sign up/i)[0]
		const firstNameLabel = screen.getByText(/first name/i)
		const firstNameInput = screen.getByRole('textbox', { name: /first name/i })
		const lastNameLabel = screen.getByText(/last name/i)
		const lastNameInput = screen.getByRole('textbox', { name: /last name/i })
		const emailLabel = screen.getByText(/email/i)
		const emailInput = screen.getByRole('textbox', { name: /email/i })
		const passwordLabel = screen.getAllByText(/password/i)[0]
		const passwordInput = screen.getAllByLabelText(/password/i)[0]
		const repeatPasswordLabel = screen.getByText(/repeat password/i)
		const repeatPasswordInput = screen.getByLabelText(/repeat password/i)
		const signUpButton = screen.getByRole('button', { name: /sign up/i })
		const googleLoginButton = screen.getByRole('button', { name: /google login/i })
		const switchedButton = screen.getByRole('button', {
			name: /already have an account\? login/i,
		})

		expect(signUpTitle).toBeInTheDocument()
		expect(firstNameLabel).toBeInTheDocument()
		expect(firstNameInput).toBeInTheDocument()
		expect(lastNameLabel).toBeInTheDocument()
		expect(lastNameInput).toBeInTheDocument()
		expect(emailLabel).toBeInTheDocument()
		expect(emailInput).toBeInTheDocument()
		expect(passwordLabel).toBeInTheDocument()
		expect(passwordInput).toBeInTheDocument()
		expect(repeatPasswordLabel).toBeInTheDocument()
		expect(repeatPasswordInput).toBeInTheDocument()
		expect(signUpButton).toBeInTheDocument()
		expect(googleLoginButton).toBeInTheDocument()
		expect(switchedButton).toBeInTheDocument()
	})
})
