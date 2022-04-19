import { IColumn } from '../../../types'
import { IActions } from './actions'
import { ActionTypes } from './types'

const initialState = [
	{
		id: 1,
		title: 'TODO',
		author: 'noname',
	},
	{
		id: 2,
		title: 'In progress',
		author: 'noname',
	},
	{
		id: 3,
		title: 'Testing',
		author: 'noname',
	},
	{
		id: 4,
		title: 'Done',
		author: 'noname',
	},
]

export default function columnArrayReducer(state: IColumn[] = initialState, action: IActions): IColumn[] {
	switch (action.type) {
		case ActionTypes.RENAME:
			return state.map(item => {
				if (item.id === action.payload.id) {
					return { ...item, ...action.payload }
				}

				return item
			})

		default:
			return state
	}
}
