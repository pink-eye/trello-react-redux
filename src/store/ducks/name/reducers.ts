import { IName } from '../../../types'
import { IAction } from './actions'
import { ActionTypes } from './types'

const initialState: IName = null

export default function nameReducer(state: IName = initialState, action: IAction): IName {
	switch (action.type) {
		case ActionTypes.SET:
			return action.payload.name

		default:
			return state
	}
}
