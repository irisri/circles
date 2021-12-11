import React, { useState, useContext } from "react";
import { JokeContext } from "../contexts/jokeContext";
import ReactCardFlip from "react-card-flip";

export function JokeCard({ joke }) {
	const [isFlipped, setFlipped] = useState(false);
	let { updateJoke } = useContext(JokeContext);

	const handleClick = (event) => {
		event.preventDefault();
		setFlipped((prevState) => !prevState);
		updateJoke(joke);
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
				<p>{joke.setup}</p>
				<p>{joke.punchline}</p>
			</div>
		</ReactCardFlip>
	);
}
