import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { Form, Field, FormProps, FormSpy } from 'react-final-form'
import InputAdapter from '../../utils/InputAdapter'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setName } from '../../store/ducks/name/actions'
import FieldChangeHandler from '../../utils/FieldChangeHandler'

interface Props {
	setHasAccess: Dispatch<SetStateAction<boolean>>
}

const Welcome: FC<Props> = ({ setHasAccess }) => {
	const dispatch = useAppDispatch()
	const [isDisabledBtn, setIsDisabledBtn] = useState(true)

	const onSubmit = (form: FormProps) => {
		if (isDisabledBtn) return

		const { name } = form

		if (name.length) {
			dispatch(setName(name))
			setHasAccess(true)
		}
	}

	const handleChange = (value: string, previousValue: string) => {
		if (value.length) {
			isDisabledBtn && setIsDisabledBtn(false)
		} else {
			!isDisabledBtn && setIsDisabledBtn(true)
		}
	}

	return (
		<Root>
			<WelcomeTitle>Hello, stranger!</WelcomeTitle>
			<Form onSubmit={onSubmit}>
				{({ handleSubmit, form, values }) => {
					return (
						<form onSubmit={handleSubmit}>
							<Field
								name="name"
								render={({ input, meta }) => (
									<InputAdapter
										input={input}
										meta={meta}
										onChange={e => {
											form.change('name', e.target.value)
											const valueName = form.getFieldState('name')
											console.log('valueName', valueName)
											console.log('values', values)
										}}
									/>
								)}
								type="text"
								placeholder="Type your name"
							/>
							<FieldChangeHandler name="name" onChange={handleChange} />
							<WelcomeButton type="submit" $isDisabled={isDisabledBtn}>
								Continue
							</WelcomeButton>
						</form>
					)
				}}
			</Form>
		</Root>
	)
}

export default Welcome

const Root = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`

const WelcomeTitle = styled.h2`
	font-size: 2em;
`

interface StyleProps {
	$isDisabled: boolean
}

const WelcomeButton = styled.button`
	margin-top: 10px;
	padding: 10px;
	background-color: blue;
	color: hsl(255, 100%, 100%);
	border-radius: 5px;
	font-weight: 700;
	width: 100%;

	${(props: StyleProps) =>
		props.$isDisabled &&
		css`
			opacity: 0.3;
			cursor: not-allowed;
		`}
`
