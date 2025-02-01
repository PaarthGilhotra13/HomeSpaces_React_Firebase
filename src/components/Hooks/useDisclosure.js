// HERE BRO M CREATING CUSTOM HOOKS CUZ THIS ISOPEN/ONPEN/ONCLOSE U WILL USE ON WHOLE SITE TO OPEN MODAL SO
// https://react.dev/learn/reusing-logic-with-custom-hooks

import { useState, useCallback } from 'react'

const useDisclosure = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState)

	// HERE IN CASE U DONT KNOW ABOUT CALLBACKS https://react.dev/reference/react/useCallback
	const onOpen = useCallback(() => {
		setIsOpen(true)
	}, [])

	const onClose = useCallback(() => {
		setIsOpen(false)
	}, [])

	const toggle = useCallback(() => {
		setIsOpen(prevIsOpen => !prevIsOpen)
	}, [])

	return {
		isOpen,
		onOpen,
		onClose,
		toggle,
	}
}

export default useDisclosure
