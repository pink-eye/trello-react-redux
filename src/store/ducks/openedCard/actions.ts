import { ICard } from '../../../types'
import { ActionTypes } from './types'

interface IActionFillOpenedCard {
	type: ActionTypes.FILL
	payload: {
		card: ICard
	}
}

const fillOpenedCard = (card: ICard) => ({
	type: ActionTypes.FILL,
	payload: {
		card,
	},
})

interface IActionClearOpenedCard {
	type: ActionTypes.CLEAR
	payload: {}
}

const clearOpenedCard = () => ({
	type: ActionTypes.CLEAR,
	payload: {},
})

export type IActions = IActionFillOpenedCard | IActionClearOpenedCard

export { fillOpenedCard, clearOpenedCard }
