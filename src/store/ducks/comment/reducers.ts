import { IComment } from '../../../types'
import { ActionTypes } from './types'
import { IActions } from './actions'

const initialState: IComment[] = []

export default function commentArrayReducer(state: IComment[] = initialState, action: IActions): IComment[] {
	switch (action.type) {
		case ActionTypes.ADD:
			return [...state, action.payload?.comment]

		case ActionTypes.REMOVE:
			return state.filter(item => item.id !== action.payload?.id)

		case ActionTypes.REMOVE_COMMENTS_BY_CARDID:
			return state.filter(item => item.cardId !== action.payload?.cardId)

		default:
			return state
	}
}
