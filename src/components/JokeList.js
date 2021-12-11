import React, { useEffect, useState } from "react";
import { jokeService } from "../services/jokeService";
import { JokeCard } from "./JokeCard";

export function JokeList(props) {
	const [displayJokes, setDisplayJokes] = useState({ jokes: [] });
	let removeJokeTimer;

	const removeFromDisplayJokes = () => {
		console.log("remove", displayJokes);

		if (displayJokes.jokes.length > 0) {
			const removeJokes = displayJokes.jokes.map((displayJoke) => {
				if (displayJoke.status === "new") {
					displayJoke.status = "removed";
				}
			});

			setDisplayJokes({ jokes: removeJokes });
			clearTimeout(removeJokeTimer);
		}
	};

	const get10Jokes = async () => {
		console.log("get");
		try {
			let getJokes = await jokeService.get10Jokes(displayJokes.jokes);

			removeJokeTimer = setTimeout(() => {
				console.log("timer");
				removeFromDisplayJokes();
				// 8000
			}, 21000);
			console.log(removeJokeTimer);
			getJokes.forEach((joke) => {
				joke.status = "new";
			});

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
		const jokeToUpdateIndex = displayJokes.jokes.findIndex((displayJoke) => {
			return displayJoke.id === jokeId;
		});
		const jokesUpdated = displayJokes.jokes;
		jokesUpdated[jokeToUpdateIndex].status = "flipped";
		setDisplayJokes((prevState) => {
			return {
				jokes: jokesUpdated,
			};
		});
	};

	useEffect(() => {
		const getJokesInterval = setInterval(() => {
			get10Jokes();
			// 5000
		}, 20000);
		return () => {
			clearTimeout(removeJokeTimer);
			clearTimeout(getJokesInterval);
		};
	});

	const showJokes = (jokes) => {
		return jokes.map((joke) => {
			if (joke.status !== "removed")
				return (
					<JokeCard
						key={joke.id}
						joke={joke}
						onclick={() => updateJoke(joke.id)}
					/>
				);
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
