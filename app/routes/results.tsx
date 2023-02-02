import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import {
	Form,
	Link,
	useLoaderData,
	useParams,
	useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Character } from "~/components/character";
import { Characters } from "~/types";
type returnType = {
	characters: Characters;
	query: string;
	page_count: number;
	page: number;
	url: string;
};
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
	const url = new URL(request.url);
	const page = url.searchParams.get("page");
	const name = url.searchParams.get("name");

	const data = await fetch(
		`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`
	);
	const json = (await data.json()) as Characters;

	return {
		characters: json,
		query: name,
		page_count: json.info.pages,
		page: page,
		url: url.searchParams.toString(),
	};
};
const Results = () => {
	const { characters, query, page_count, page, url } =
		useLoaderData() as returnType;

	const prev = characters?.info?.prev?.slice(42) || url;
	const next = characters?.info?.next?.slice(42) || url;
	return (
		<div>
			Results for {query}
			<section className="character-list">
				{characters?.results?.map((character) => (
					<Character key={character.id} character={character} />
				))}
			</section>
			<section className="change-page-section">
				<div className="change-page">
					<Link className="button" to={prev!}>
						Previous Page
					</Link>
					<p>
						Page {page} of {page_count}
					</p>
					<Link to={next!}>Next Page</Link>
				</div>
			</section>
		</div>
	);
};
export default Results;
