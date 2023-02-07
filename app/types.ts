export type CharacterType = {
	id: number;
	name: string;
	status: "Alive" | "Dead" | "unknown";
	species: string;
	type: string;
	gender: "Female" | "Male" | "Genderless" | "unknown";
	origin: Location;
	location: Location;
	image: string;
	episode: string[];
	url: string;
	created: string;
};
type Location = {
	name: string;
	url: string;
};
export type Characters = {
	info: Info;
	results: CharacterType[];
};
export type MultipleCharacters = CharacterType[];
type Info = {
	count: number;
	pages: number;
	next: string | null;
	prev: null | string;
};
export type LocationType = {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
};
