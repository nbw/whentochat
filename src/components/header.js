import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle, siteSubtitle }) => (
  <div id="header" >
		<h1>
			<Link
				to="/"
				style={{
					color: 'white',
					textDecoration: 'none',
				}}
			>
				{siteTitle}
			</Link>
		</h1>
    <h2>{siteSubtitle}</h2>
	</div>
)

export default Header
