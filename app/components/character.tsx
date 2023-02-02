import { Link } from "@remix-run/react";
import type { CharacterType } from "~/types";

export const Character = ({ character }: { character: CharacterType }) => {
	return (
		<Link to={`/character/${character.id}`} className="character-item">
			<div>
				<img src={character.image} />
			</div>
			<article>
				<h1>{character.name}</h1>
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
				<p>Location: {character.origin.name}</p>
			</article>
		</Link>
	);
};
