import { useEffect } from 'react'
import useFieldValue from '../hooks/useFieldValue'

interface Props {
	name: string
	onChange: (value: string, previousValue: string) => void
}

export default ({ name, onChange }: Props) => {
	const [value, previousValue] = useFieldValue(name)

	useEffect(() => {
		if (value !== previousValue) {
			onChange(value, previousValue)
		}
	}, [onChange, value, previousValue])

	return null
}
