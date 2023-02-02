import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CharacterType, LocationType } from "~/types";

type returnType = {
	character: CharacterType;
	location: LocationType;
};
export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
	const data = await fetch(
		`https://rickandmortyapi.com/api/character/${params.characterId}`
	);
	const json = (await data.json()) as CharacterType;
	const locationData = await fetch(json.origin.url);
	const locationJson = await locationData.json();

	return { character: json, location: locationJson };
};
const Character = () => {
	const { character, location } = useLoaderData() as returnType;

	return (
		<div>
			<article className="character-page">
				<img src={character.image} alt="character-image" />
				<section>
					<h1>{character.name}</h1>
					<div>
						<p>
							<span
								className={
									character.status == "Alive"
										? "status-icon-alive"
										: character.status == "Dead"
										? "status-icon-dead"
										: "status-icon-unknown"
								}
							></span>
							{character.status} - {character.species}
						</p>
						<p>Gender: {character.gender}</p>
						<p>Featured in {character.episode.length} episode(s)</p>
					</div>
				</section>
				<section>
					<h3>{location.name}</h3>
					<div>
						<p>{location.dimension}</p>
						<p>Type: {location.type}</p>
						<p>{location.residents.length} Residents</p>
					</div>
				</section>
			</article>
		</div>
	);
};

export default Character;
