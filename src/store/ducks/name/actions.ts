import { IName } from '../../../types'
import { ActionTypes } from './types'

export interface IAction {
	type: ActionTypes.SET
	payload: {
		name: IName
	}
}

const setName = (name: IName) => ({
	type: ActionTypes.SET,
	payload: {
		name,
	},
})

export { setName }
