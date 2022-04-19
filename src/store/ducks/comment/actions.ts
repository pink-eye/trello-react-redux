import { IComment } from '../../../types'
import { ActionTypes } from './types'

interface IActionAddComment {
	type: ActionTypes.ADD
	payload: {
		comment: IComment
	}
}

const addComment = (comment: IComment) => ({
	type: ActionTypes.ADD,
	payload: {
		comment,
	},
})

interface IActionRemoveComment {
	type: ActionTypes.REMOVE
	payload: {
		id: string
	}
}

const removeComment = (id: string) => ({
	type: ActionTypes.REMOVE,
	payload: {
		id,
	},
})

interface IActionRemoveCommentsByCardId {
	type: ActionTypes.REMOVE_COMMENTS_BY_CARDID
	payload: {
		cardId: string
	}
}

const removeCommentsByCardId = (cardId: string) => ({
	type: ActionTypes.REMOVE_COMMENTS_BY_CARDID,
	payload: {
		cardId,
	},
})

export type IActions = IActionAddComment | IActionRemoveComment | IActionRemoveCommentsByCardId

export { addComment, removeComment, removeCommentsByCardId }
