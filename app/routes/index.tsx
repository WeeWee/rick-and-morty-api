import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "react-router";
import { Character } from "~/components/character";
import { Characters, MultipleCharacters } from "~/types";

export const loader: LoaderFunction = async () => {
	const data = await fetch(
		`https://rickandmortyapi.com/api/character/[1,2,3,4,5,6]`
	);
	const json = (await data.json()) as MultipleCharacters;
	//console.log(json);

	return {
		results: json,
	};
};

export default function Index() {
	const data = useLoaderData() as MultipleCharacters;
	//console.log(data);
	return (
		<div>
			<section className="character-section">
				<ul className="character-list">
					{data.results.map((character) => (
						<Character key={character.id} character={character} />
					))}
				</ul>
			</section>
		</div>
	);
}
