import React, { FC, useMemo } from 'react'
import styled from 'styled-components/macro'
import { ICard } from '../../types'
import Comment from '../Comment'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addComment } from '../../store/ducks/comment/actions'
import { useAppSelector } from '../../hooks/useAppSeletor'
import { editCard } from '../../store/ducks/card/actions'
import { Form, Field, FormProps } from 'react-final-form'
import InputAdapter from '../../utils/InputAdapter'
import OnChange from '../../utils/FieldChangeHandler'

const OpenedCard: FC<ICard> = props => {
	const dispatch = useAppDispatch()
	const columnArray = useAppSelector(state => state.columnArray)
	const commentArray = useAppSelector(state => state.commentArray)
	const savedName = useAppSelector(state => state.name)

	const handleClickAdd = (form: FormProps) => {
		const { comment } = form

		if (comment.length) {
			if (savedName) {
				const newComment = { text: comment, author: savedName, id: uuidv4(), cardId: props.id }

				dispatch(addComment(newComment))
			}
		}
	}

	const handleChangeTitle = (value: string, previousValue: string) => {
		const updatedCard = { ...props, title: value }

		dispatch(editCard(updatedCard))
	}

	const handleChangeDescription = (value: string, previousValue: string) => {
		const updatedCard = { ...props, description: value }

		dispatch(editCard(updatedCard))
	}

	const filteredCommentArray = commentArray.filter(item => item.cardId === props.id)

	const columnOfCard = useMemo(() => columnArray.find(item => item.id === props.columnId), [commentArray])

	return (
		<>
			<OpenedCardColumn>{columnOfCard?.title} </OpenedCardColumn>
			<Form
				onSubmit={() => {}}
				render={({ handleSubmit }) => (
					<OpenedCardForm onSubmit={handleSubmit}>
						<OpenedCardAuthor>by {props.author}</OpenedCardAuthor>
						<Field
							$view="openedCardTitle"
							name="title"
							type="text"
							defaultValue={props.title}
							component={InputAdapter}
							placeholder="Title"
						/>
						<OnChange name="title" onChange={handleChangeTitle} />
						<Field
							$view="openedCardDescription"
							name="description"
							type="text"
							defaultValue={props.description}
							component={InputAdapter}
							placeholder="Description"
						/>
						<OnChange name="description" onChange={handleChangeDescription} />
					</OpenedCardForm>
				)}></Form>
			{filteredCommentArray.length ? (
				<OpenedCardCommentList>
					{filteredCommentArray.map((comment, index) => (
						<OpenedCardCommentItem key={index}>
							<Comment {...comment} />
						</OpenedCardCommentItem>
					))}
				</OpenedCardCommentList>
			) : (
				<></>
			)}
			<Form
				onSubmit={handleClickAdd}
				render={({ handleSubmit }) => (
					<OpenedCardForm onSubmit={handleSubmit}>
						<Field
							$view="inputComment"
							name="comment"
							type="text"
							component={InputAdapter}
							placeholder="Type a comment..."
						/>
						<OpenedCardBtn type="submit">Send</OpenedCardBtn>
					</OpenedCardForm>
				)}></Form>
		</>
	)
}

export default OpenedCard

const Root = styled.div``

const OpenedCardColumn = styled.span`
	display: block;
	text-align: right;
`

const OpenedCardForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-top: 20px;
`

const OpenedCardAuthor = styled.address`
	font-size: 0.8em;
	color: gray;
	text-align: right;
`

const OpenedCardCommentList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 5px;
	background-color: lightgray;
	border-radius: 5px;
	margin-top: 10px;
	overflow-y: auto;
`

const OpenedCardCommentItem = styled.li``

const OpenedCardBtn = styled.button`
	color: gray;
	border: 2px solid gray;
	font-weight: 700;
	padding: 10px 20px;
	width: 100%;
	background-color: white;
	border-radius: 5px;
`
