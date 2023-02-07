import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
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
	let locationJson = null;
	if (json.origin.url) {
		const locationData = await fetch(json.origin.url);
		locationJson = await locationData.json();
	}

	return { character: json, location: locationJson };
};
const Character = () => {
	const { character, location } = useLoaderData() as returnType;
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<div className="character-page">
			<article className="character-article">
				<img src={character.image} alt="character-image" />
				<section>
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
						<h3>{location?.name}</h3>
						<div>
							<p>{location?.dimension}</p>
							<p> {location?.type ? `Type: ${location?.type}` : ``}</p>
							<p>
								{location?.residents.length
									? `${location?.residents.length} Residents`
									: ``}
							</p>
						</div>
					</section>
				</section>
			</article>
			<button className="return-button" onClick={goBack}>
				Go Back
			</button>
		</div>
	);
};

export default Character;
