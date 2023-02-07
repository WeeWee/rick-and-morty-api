import {
	LinksFunction,
	LoaderArgs,
	LoaderFunction,
	MetaFunction,
	json,
} from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import styles from "./css/styles.css";
import { Navbar } from "./components/navbar";

import { visitedCount } from "./utils/cookie";
export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "The Rick and Morty Website",
	viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => {
	return [
		{
			rel: "icon",
			href: "/favicon.png",
			
			sizes: "64x64",
			type: "image/png",
		},
		{ rel: "stylesheet", href: styles },
	];
};
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
	const cookieHeader = request.headers.get("Cookie");
	const visitedCountCookie = await visitedCount.parse(cookieHeader);
	console.log(visitedCountCookie);
	if (visitedCountCookie) {
		const newCount = visitedCountCookie.count + 1;
		return json(
			{ count: visitedCountCookie.count },
			{
				headers: {
					"Set-Cookie": await visitedCount.serialize({
						count: newCount,
					}),
				},
			}
		);
	}
	return json(
		{ visitedCountCookie },
		{
			headers: {
				"Set-Cookie": await visitedCount.serialize({ count: 1 }),
			},
		}
	);
};
export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Navbar />
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
