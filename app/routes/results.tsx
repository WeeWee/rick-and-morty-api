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
import { Filter } from "~/components/filter";
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
	const status = url.searchParams.get("status") || "";
	const gender = url.searchParams.get("gender") || "";
	const species = url.searchParams.get("species") || "";
	if (!name) {
		return {
			characters: null,
			query: null,
			page_count: null,
			page: null,
			url: null,
		};
	}
	const data = await fetch(
		`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}&status=${status}&gender=${gender}&species=${species}`
	);
	const json = (await data.json()) as Characters;

	return {
		characters: json,
		query: name,
		page_count: json.info?.pages,
		page: page,
		url: url.searchParams.toString(),
	};
};
const Results = () => {
	const { characters, query, page_count, page, url } =
		useLoaderData() as returnType;

	const prev = characters?.info?.prev?.slice(42) || url;
	const next = characters?.info?.next?.slice(42) || url;
	if (!characters)
		return <div className="error-results">You have not specified a name</div>;
	return (
		<div>
			Results for {query}
			<Filter name={query} />
			<section className="character-list">
				{characters?.results?.map((character) => (
					<Character key={character.id} character={character} />
				))}
			</section>
			
			<section
				className={
					page && page_count > 1 && prev && next
						? "change-page-section"
						: "hidden"
				}
			>
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
