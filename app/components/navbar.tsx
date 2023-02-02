import { Form, Link } from "@remix-run/react";
import { useRef } from "react";

export const Navbar = () => {
	const formRef = useRef(null);
	const handleSubmit = () => {
		formRef.current?.reset();
	};
	return (
		<nav className="navbar">
			<ul>
				<li>
					<Form
						onSubmit={handleSubmit}
						ref={formRef}
						method="get"
						action="/results"
						id="search-form"
					>
						<input name="name" placeholder="search name" />
						<input name="page" hidden defaultValue="1" />
						<button type="submit">Search!</button>
					</Form>
				</li>
				<li>
					<Link to="/">Home</Link>
				</li>
			</ul>
		</nav>
	);
};
