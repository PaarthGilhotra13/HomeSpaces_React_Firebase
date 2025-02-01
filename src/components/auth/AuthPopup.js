import React, { useMemo } from 'react'
import Modal from 'react-responsive-modal'
import Login from './Login'
import Register from './Register'
import 'react-responsive-modal/styles.css'
const AuthPopup = ({ isopen, onClose, view, modalProps, componentProps }) => {
	const views = useMemo(
		() => ({
			login: <Login {...(componentProps ? componentProps : {})} />,
			register: <Register {...(componentProps ? componentProps : {})} />,
		}),
		[componentProps],
	)
	return (
		<Modal
			open={isopen}
			onClose={onClose}
			dialogClassName="my-modal"
			center
			classNames={{ modal: 'customModal' }}
			{...modalProps}
		>
			{views[view]}
		</Modal>
	)
}
export default AuthPopup
