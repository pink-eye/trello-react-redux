import { ActionTypes } from './types'

export interface IActions {
	type: ActionTypes.RENAME
	payload: {
		id: number
		title: string
	}
}

const renameColumn = (id: number, title: string) => ({
	type: ActionTypes.RENAME,
	payload: {
		id,
		title,
	},
})

export { renameColumn }
