import React, { useRef, ElementRef } from 'react'
import styled from 'styled-components/macro'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSeletor'
import { clearOpenedCard } from '../../store/ducks/openedCard/actions'
import Column from '../Column/Column'
import Modal from '../Modal'
import OpenedCard from '../OpenedCard'

type ModalAPI = ElementRef<typeof Modal>

const ColumnList = () => {
	const dispatch = useAppDispatch()
	const columnArray = useAppSelector(state => state.columnArray)
	const modalRef = useRef<ModalAPI>(null)
	const openedCard = useAppSelector(state => state.openedCard)

	const openModal = () => modalRef.current?.open()

	const resetOpenedCard = () => dispatch(clearOpenedCard())

	return (
		<Root>
			{columnArray.map((column, index) => (
				<ColumnListItem key={column.id}>
					<Column {...column} openModal={openModal} />
				</ColumnListItem>
			))}
			<Modal ref={modalRef} canClose={true} onClose={resetOpenedCard}>
				<OpenedCard {...openedCard} />
			</Modal>
		</Root>
	)
}

export default ColumnList

const Root = styled.ul`
	display: flex;
	gap: 30px;
	padding-block: 30px;
	padding-inline: 10px;
	width: 100%;
	height: 100%;
	overflow-x: auto;
	background-color: aliceblue;
`
const ColumnListItem = styled.li`
	height: 100%;
	min-width: 300px;
`
