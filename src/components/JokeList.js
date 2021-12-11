import React, { useEffect, useState } from "react";
import { jokeService } from "../services/jokeService";
// import { JokeContext } from "../contexts/jokeContext";
import { JokeCard } from "./JokeCard";

export function JokeList(props) {
	// let { displayJokes, getJokes } = useContext(JokeContext);
	const [displayJokes, setDisplayJokes] = useState({ jokes: [] });
	let timer;

	const removeFromDisplayJokes = () => {
		console.log("remove", displayJokes);

		if (displayJokes.jokes.length > 0) {
			const removeJokes = displayJokes.jokes.map((displayJoke) => {
				if (displayJoke.status === "new") {
					displayJoke.status = "removed";
				}
			});
			clearTimeout(timer);
		}
	};

	const get10Jokes = async () => {
		try {
			let getJokes = await jokeService.get10Jokes(displayJokes.jokes);

			timer = setTimeout(() => {
				console.log("timer");
				removeFromDisplayJokes();
				// 8000
			}, 21000);

			getJokes.forEach((joke) => {
				joke.status = "new";
			});
			console.log("timer array", removeJokesTimers);

			setDisplayJokes((prevState) => {
				return {
					jokes: [...prevState.jokes, ...getJokes],
				};
			});
		} catch (err) {
			console.log(err);
		}
	};

	const updateJoke = (jokeId) => {
		console.log(jokeId, displayJokes);
		const jokeToUpdate = displayJokes.jokes.find(
			(displayJoke) => displayJoke.id === jokeId
		);

		jokeToUpdate.status = "flipped";

		setDisplayJokes((prevState) => {
			return {
				jokes: [...prevState.jokes, jokeToUpdate],
			};
		});
		console.log(displayJokes);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			get10Jokes();
			// 5000
		}, 20000);
		return () => {
			clearTimeout(timer);
			clearTimeout(timer);
		};
	});

	const showJokes = (jokes) => {
		return jokes.map((joke) => {
			if (joke.status !== "removed")
				return <JokeCard key={joke.id} joke={joke} updateJoke={updateJoke} />;
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
