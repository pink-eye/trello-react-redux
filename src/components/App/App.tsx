import React, { useEffect, useState } from 'react'
import Welcome from '../Welcome'
import Header from '../Header'
import Modal from '../Modal'
import ColumnList from '../ColumnList'
import { useAppSelector } from '../../hooks/useAppSeletor'

const App = () => {
	const [hasAccess, setHasAccess] = useState(false)
	const savedName = useAppSelector(state => state.name)

	useEffect(() => {
		if (savedName) setHasAccess(true)
	}, [])

	return (
		<>
			<Header />
			<main>
				<ColumnList />
			</main>
			{!hasAccess && (
				<Modal isOpen={true}>
					<Welcome setHasAccess={setHasAccess} />
				</Modal>
			)}
		</>
	)
}

export default App
