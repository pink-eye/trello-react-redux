import { ICard } from '../../../types'
import { ActionTypes } from './types'
import { IActions } from './actions'

const initialState: ICard = {
	columnId: -1,
	title: '',
	description: '',
	author: '',
	id: '',
}

export default function openedCardReducer(state: ICard = initialState, action: IActions): ICard {
	switch (action.type) {
		case ActionTypes.FILL:
			return action.payload.card

		case ActionTypes.CLEAR:
			return initialState

		default:
			return state
	}
}
