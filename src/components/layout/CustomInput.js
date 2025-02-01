import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi' // Import eye icons from react-icons
import '../CustomInput.css' // Create a separate CSS file to style the custom input component

const CustomInput = props => {
	const [showPassword, setShowPassword] = useState(false)

	const handleTogglePassword = () => {
		setShowPassword(prevShowPassword => !prevShowPassword)
	}

	return (
		<div className="custom-input-container">
			<input
				className={props.className}
				type={showPassword ? 'text' : 'password'}
				value={props.value}
				onChange={props.onChange}
				placeholder="enter your password"
			/>
			{/* Toggle password visibility with eye icon */}
			<span onClick={handleTogglePassword}>{showPassword ? <FiEyeOff /> : <FiEye />}</span>
		</div>
	)
}

export default CustomInput
