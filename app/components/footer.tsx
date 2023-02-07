export const Footer = ({ count }: { count: number }) => {
	return (
		<footer className="footer">
			<section>
				{count ? (
					<p>
						Visit count: <span>{count}</span>
					</p>
				) : (
					""
				)}
				<h4>
					Made by{" "}
					<a href="https://www.linkedin.com/in/adam-kindberg/">Adam Kindberg</a>
				</h4>
				<p>
					Data fetched from{" "}
					<a href="https://rickandmortyapi.com/">Rick and Morty Api</a>
				</p>
			</section>
		</footer>
	);
};
