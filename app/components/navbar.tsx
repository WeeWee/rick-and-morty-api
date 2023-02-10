import { Form, Link } from "@remix-run/react";
import { useRef } from "react";
export const Navbar = () => {
  const formRef = useRef(null);

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">The Best Rick and Morty Website</Link>
      </h1>
      <h4>
        <Link to="/">Home</Link>
      </h4>
      <Form ref={formRef} method="get" action="/results" id="search-form">
        <input name="page" hidden defaultValue="1" />
        <input name="name" placeholder="search name" />
        <button type="submit">Search</button>
      </Form>
    </nav>
  );
};
