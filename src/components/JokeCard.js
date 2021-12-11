import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

export function JokeCard({ joke, updateJoke }) {
	const [isFlipped, setFlipped] = useState(false);

	const handleClick = (event) => {
		event.stopPropagation();
		setFlipped((prevState) => !prevState);
		updateJoke(joke.id, "flipped");
	};

	let CardStyle = {
		border: "1px black solid",
		borderRadius: "10px",
		padding: "20px",
		margin: "20px",
		width: "350px",
		height: "220px",
	};

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
			<div className="cardFront" style={CardStyle} onClick={handleClick}>
				Click to see the joke!
			</div>

			<div className="cardBack" style={CardStyle}>
				<p>{joke.id}</p>
				<p>{joke.setup}</p>
				<p>{joke.punchline}</p>
			</div>
		</ReactCardFlip>
	);
}
