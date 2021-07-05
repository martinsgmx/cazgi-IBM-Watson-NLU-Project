import React from 'react';

import IBMLogo from '../media/img/logo.png';

export default function () {
	return(
		<>
			<nav className="navbar bg-primary shadow-lg sticky-top px-1" >
				<span className="navbar-brand" >
					<img
						src={ IBMLogo }
						className="logo-img d-inline-block align-top"
						alt="logo"
					/>
				</span>
			</nav>
		</>
	)
};