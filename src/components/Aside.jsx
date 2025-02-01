import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

const menus = [
	{ id: 1, path: '/', label: 'Home' },
	{ id: 2, path: '/about', label: 'About' },
	{
		id: 3,
		label: 'Charts',
		subItems: [
			{ id: 31, path: '/pie', label: 'Pie charts' },
			{ id: 32, path: '/line', label: 'Line charts' },
		],
	},
]

const Aside = ({ collapsed }) => {
	const renderMenuItem = menu =>
		menu.path ? (
			<MenuItem key={menu.id} component={<Link to={menu.path} />}>
				{menu.label}
			</MenuItem>
		) : (
			menu.subItems && (
				<SubMenu key={menu.id} label={menu.label}>
					{menu.subItems.map(subItem => (
						<MenuItem key={subItem.id} component={<Link to={subItem.path} />}>
							{subItem.label}
						</MenuItem>
					))}
				</SubMenu>
			)
		)

	const menuItems = menus.map(menu => renderMenuItem(menu))

	return (
		<Sidebar collapsed={collapsed}>
			<Menu>{menuItems}</Menu>
		</Sidebar>
	)
}

export default Aside
