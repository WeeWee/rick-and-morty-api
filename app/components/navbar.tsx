import { Form, Link } from "@remix-run/react";
import { useRef } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
export const Navbar = () => {
	const formRef = useRef(null);

	return (
		<nav className="navbar">
			<h1>
				<Link to="/">The Best Rick and Morty Website</Link>
			</h1>

			<Form ref={formRef} method="get" action="/results" id="search-form">
				<input name="page" hidden defaultValue="1" />
				<input name="name" placeholder="search name" />
				<button type="submit">Search</button>
			</Form>
		</nav>
	);
};
