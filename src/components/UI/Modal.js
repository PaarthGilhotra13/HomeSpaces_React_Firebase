import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

// yha pai menai framer motion use kra https://www.framer.com/motion/animate-presence/ native css for animation i hate
import { motion } from 'framer-motion'

const Modal = ({ isOpen, onClose, children }) => {
	const [isAnimating, setIsAnimating] = useState(false)

	// this useEffect  m adding agr koii modal sai bhir click krta to close krnai k liye
	// incase u dont know https://react.dev/reference/react/useEffect
	useEffect(() => {
		const handleCloseOnOverlayClick = event => {
			if (isOpen && event.target.classList.contains(styles['modal-overlay'])) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleCloseOnOverlayClick)

		return () => {
			document.removeEventListener('mousedown', handleCloseOnOverlayClick)
		}
	}, [isOpen, onClose])

	useEffect(() => {
		setIsAnimating(isOpen)
	}, [isOpen])

	if (!isAnimating) {
		return null
	}

	// READ THIS BRO https://react.dev/reference/react-dom/createPortal v v important
	return createPortal(
		<motion.div
			className={styles['modal-overlay']}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className={`${styles.modal} ${styles.open}`}
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.9 }}
			>
				<div className={styles['modal-header']}>
					<button className={styles['modal-close-btn']} onClick={onClose}>
						&times;
					</button>
				</div>
				<div className={styles['modal-content']}>{children}</div>
			</motion.div>
		</motion.div>,
		document.body,
	)
}

// READ THIS BRO https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
}

export default Modal
