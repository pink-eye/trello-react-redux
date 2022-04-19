import styled, { css } from 'styled-components/macro'
import React, { FC } from 'react'
import { FieldRenderProps } from 'react-final-form'

type Props = FieldRenderProps<string> & React.InputHTMLAttributes<HTMLInputElement>

const InputAdapter: FC<Props> = ({ input, ...rest }) => {
	return <Root {...input} {...rest} />
}

export default InputAdapter

interface StyleProps {
	$view?: string
}

const Root = styled.input`
	padding: 10px 20px;
	font-size: 1em;
	width: 100%;

	${(props: StyleProps) => {
		switch (props.$view) {
			case 'openedCardTitle':
			case 'columnTitle':
				return css`
					border: 0;
					font-weight: 700;
					font-size: 1.2em;
					padding: 5px;
				`
			case 'inputComment':
			case 'columnBottomInput':
				return css`
					border-top: 0;
					border-inline: 0;
					border-bottom: 2px solid lightgray;
					padding: 5px;
					font-size: 0.9em;
				`
			case 'openedCardDescription':
				return css`
					margin-top: 10px;
					border: 0;
					padding: 5px;
					font-size: 0.9em;
				`
			default:
				return
		}
	}}
`
