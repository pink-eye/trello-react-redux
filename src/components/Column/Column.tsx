import React, { FC } from 'react'
import styled from 'styled-components/macro'
import { ICard, IColumn } from '../../types'
import Card from '../Card'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { renameColumn } from '../../store/ducks/column/actions'
import { addCard, removeCard } from '../../store/ducks/card/actions'
import { useAppSelector } from '../../hooks/useAppSeletor'
import { removeCommentsByCardId } from '../../store/ducks/comment/actions'
import { Form, Field, FormProps } from 'react-final-form'
import OnChange from '../../utils/FieldChangeHandler'
import InputAdapter from '../../utils/InputAdapter'
import { fillOpenedCard } from '../../store/ducks/openedCard/actions'

interface Props extends IColumn {
	openModal: () => void
}

const Column: FC<Props> = ({ openModal, ...props }) => {
	const dispatch = useAppDispatch()
	const cardArray = useAppSelector(state => state.cardArray)
	const commentArray = useAppSelector(state => state.commentArray)
	const savedName = useAppSelector(state => state.name)

	const handleChange = (value: string, previousValue: string) => {
		dispatch(renameColumn(props.id, value))
	}

	const handleClickAdd = (form: FormProps) => {
		const { title } = form

		if (title?.length) {
			if (savedName) {
				const newCard = {
					description: '',
					title,
					author: savedName,
					columnId: props.id,
					id: uuidv4(),
				}

				dispatch(addCard(newCard))
			}
		}
	}

	const handleClickRemove = (card: ICard) => {
		dispatch(removeCard(card.id))
		dispatch(removeCommentsByCardId(card.id))
	}

	const openCard = (card: ICard) => {
		dispatch(fillOpenedCard(card))
		openModal()
	}

	const filteredCardArray = cardArray.filter(item => item.columnId === props.id)

	return (
		<Root>
			<Form
				onSubmit={() => {}}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Field
							$view="columnTitle"
							defaultValue={props.title}
							name="title"
							component={InputAdapter}
							type="text"
							placeholder="Title"></Field>
						<OnChange name="title" onChange={handleChange} />
					</form>
				)}></Form>
			<ColumnAuthor>by {props.author}</ColumnAuthor>
			<ColumnCardList>
				{filteredCardArray.map(card => {
					const cardComments = commentArray.filter(item => item.cardId === card.id)
					const cardCommentsLength = cardComments.length

					return (
						<li key={card.id}>
							<Card
								{...card}
								onOpen={openCard}
								onRemove={handleClickRemove}
								comments={cardCommentsLength}
							/>
						</li>
					)
				})}
			</ColumnCardList>
			<Form
				onSubmit={handleClickAdd}
				render={({ handleSubmit }) => (
					<ColumnForm onSubmit={handleSubmit}>
						<Field
							$view="columnBottomInput"
							name="title"
							component={InputAdapter}
							type="text"
							placeholder="Type title for a new card"></Field>
						<ColumnBtn type="submit">Add a new card</ColumnBtn>
					</ColumnForm>
				)}></Form>
		</Root>
	)
}

export default Column

const Root = styled.aside`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	height: 100vh;
	padding-block: 30px 10px;
	padding-inline: 10px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 10px 20px 1px hsl(0, 0%, 90%);
`

const ColumnAuthor = styled.address`
	font-size: 0.9em;
	color: gray;
`

const ColumnCardList = styled.ul`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex: 1;
	border-radius: 5px;
	overflow-y: auto;
	padding: 5px;
	background-color: aliceblue;
	border: 1px solid lightgray;
`

const ColumnForm = styled.form`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const ColumnInput = styled.input`
	padding: 5px;
	border: 0;
	border-bottom: 2px solid lightgray;
`

const ColumnBtn = styled.button`
	padding: 10px 15px;
	background-color: white;
	border: 3px solid blue;
	border-radius: 5px;
	font-weight: 700;
	color: blue;
`
