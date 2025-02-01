import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Aside from './Aside'

const BaseLayout = () => {
	const [collapsed, setCollapsed] = React.useState(false)
	return (
		<div>
			<div
				style={{
					display: 'flex',
					height: '100%',
					minHeight: '400px',
					gap: 'none',
				}}
			>
				<Aside collapsed={collapsed} />

				<main style={{ padding: 10 }}>
					
					<button
						className="sb-button"
						onClick={() => setCollapsed(!collapsed)}
					>
						Collapse
					</button>
					<Outlet />
					<ScrollRestoration />
				</main>
			</div>
		</div>
	)
}

export default BaseLayout
