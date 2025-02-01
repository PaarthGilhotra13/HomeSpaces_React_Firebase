import React from 'react'

function EmailLink({ email }) {
	const mailtoLink = `mailto:${email}`

	return (
		<div>
			<p>Click the link below to open your default email client:</p>
			<a href={mailtoLink}>Send Email</a>
		</div>
	)
}

export default EmailLink
