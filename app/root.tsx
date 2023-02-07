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
	useLoaderData,
	useLocation,
} from "@remix-run/react";
import styles from "./css/styles.css";
import { Navbar } from "./components/navbar";
import { useEffect } from "react";
import { visitedCount } from "./utils/cookie";
export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
	const cookieHeader = request.headers.get("Cookie");
	const visitedCountCookie = await visitedCount.parse(cookieHeader);
	console.log(visitedCountCookie);
	const newCount = visitedCountCookie.count + 1;
	if (visitedCountCookie) {
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
