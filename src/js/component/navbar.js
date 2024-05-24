import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand m-2 h1">Home</span>
			</Link>
			<div className="m-2">
				<Link to="/demo">
					<button className="btn btn-warning">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};
