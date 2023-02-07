import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Character } from "~/components/character";
import { Filter } from "~/components/filter";
import { Footer } from "~/components/footer";
import { Characters, MultipleCharacters } from "~/types";
import { visitedCount } from "~/utils/cookie";
type ReturnType = {
	characters: MultipleCharacters;
	count: number;
};
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
	const cookieHeader = request.headers.get("Cookie");
	const visitedCountCookie = await visitedCount.parse(cookieHeader);
	const data = await fetch(
		`https://rickandmortyapi.com/api/character/[1,2,3,4,5,6]`
	);
	const json = (await data.json()) as MultipleCharacters;
	//console.log(json);
	if (!visitedCountCookie)
		return {
			characters: json,
			count: null,
		};
	return {
		characters: json,
		count: visitedCountCookie.count,
	};
};

export default function Index() {
	const { characters, count } = useLoaderData() as ReturnType;
	console.log(characters);
	return (
		<div>
			<section className="character-section">
				<ul className="character-list">
					{characters?.map((character) => (
						<Character key={character.id} character={character} />
					))}
				</ul>
			</section>
			<Footer count={count} />
		</div>
	);
}
