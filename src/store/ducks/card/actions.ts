import { ICard } from '../../../types'
import { ActionTypes } from './types'

interface IActionCommon {
	type: ActionTypes.ADD | ActionTypes.EDIT
	payload: {
		card: ICard
	}
}

interface IActionRemoveCard {
	type: ActionTypes.REMOVE
	payload: {
		id: string
	}
}

const addCard = (card: ICard) => ({
	type: ActionTypes.ADD,
	payload: {
		card,
	},
})

const removeCard = (id: string) => ({
	type: ActionTypes.REMOVE,
	payload: {
		id,
	},
})

const editCard = (card: ICard) => ({
	type: ActionTypes.EDIT,
	payload: {
		card,
	},
})

export type IActions = IActionCommon | IActionRemoveCard

export { addCard, removeCard, editCard }
