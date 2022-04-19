import { ICard } from '../../../types'
import { IActions } from './actions'
import { ActionTypes } from './types'

const initialState: ICard[] = []

export default function cardArrayReducer(state: ICard[] = initialState, action: IActions): ICard[] {
	switch (action.type) {
		case ActionTypes.ADD:
			return [...state, action.payload?.card]

		case ActionTypes.REMOVE:
			return state.filter(item => item.id !== action.payload?.id)

		case ActionTypes.EDIT:
			return state.map(item => {
				if (item.id === action.payload?.card.id) {
					return { ...item, ...action.payload?.card }
				}

				return item
			})

		default:
			return state
	}
}
