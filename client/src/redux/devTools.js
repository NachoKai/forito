import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const stateSanitizer = state => state
const actionSanitizer = action => action

export default composeWithDevTools({
	actionSanitizer,
	stateSanitizer,
})
