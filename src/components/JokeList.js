import React, { useEffect, useContext } from "react";
import { JokeContext } from "../contexts/jokeContext";
import { JokeCard } from "./JokeCard";

export function JokeList(props) {
	let { displayJokes, getJokes } = useContext(JokeContext);

	const get10Jocks = async () => {
		getJokes();
	};

	useEffect(() => {
		// get10Jocks();
		// console.log("list use effect");
		const timer = setTimeout(() => {
			get10Jocks();
			// 5000
		}, 20000);
		return () => {
			clearTimeout(timer);
		};
	});

	const showJokes = (jokes) => {
		return jokes.map((joke) => {
			return <JokeCard key={joke.id} joke={joke} />;
		});
	};

	if (displayJokes.jokes.length > 0) {
		return (
			<div>
				<div className="flex wrap">{showJokes(displayJokes.jokes)}</div>
			</div>
		);
	} else {
		return (
			<div>
				<h5>No Cards!</h5>
			</div>
		);
	}
}
