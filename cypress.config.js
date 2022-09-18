import { defineConfig } from 'cypress'
import pluginConfig from './cypress/plugins/index'

export default defineConfig({
	projectId: 'c1d4q5',
	video: false,
	experimentalSessionSupport: true,

	e2e: {
		setupNodeEvents(on, config) {
			return pluginConfig(on, config)
		},
		baseUrl: 'http://localhost:3000',
		excludeSpecPattern: '**/config.json',
	},

	component: {
		devServer: {
			framework: 'create-react-app',
			bundler: 'webpack',
		},
	},
})
