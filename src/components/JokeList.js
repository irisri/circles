import React, { useEffect, useState } from "react";
import { jokeService } from "../services/jokeService";
import { JokeCard } from "./JokeCard";

export function JokeList(props) {
	const [displayJokes, setDisplayJokes] = useState({ jokes: [] });

	const removeFromDisplayJokes = (jokeId) => {
		console.log("remove", jokeId);

		if (displayJokes.jokes.length > 0) {
			const removeJokes = displayJokes.jokes.map((displayJoke) => {
				if (displayJoke.id === jokeId) {
					clearTimeout(displayJoke.timer);
					displayJoke.status = "removed";
					displayJoke.timer = false;
				}
			});

			setDisplayJokes({ jokes: removeJokes });
		}
	};

	const get10Jokes = async () => {
		console.log("get");
		try {
			let getJokes = await jokeService.get10Jokes(displayJokes.jokes);
			getJokes.forEach((joke) => {
				const removeJokeTimer = setTimeout(() => {
					console.log("timer", joke.id);
					removeFromDisplayJokes(joke.id);
					// 8000
				}, 21000);
				joke.status = "new";
				joke.timer = removeJokeTimer;
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
		clearTimeout(jokesUpdated[jokeToUpdateIndex].timer);
		jokesUpdated[jokeToUpdateIndex].timer = false;
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
			displayJokes.jokes.forEach((displayJoke) =>
				clearTimeout(displayJoke.timer)
			);
			clearInterval(getJokesInterval);
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
				<h3 style={{ textAlign: "center" }}>No Cards!</h3>
			</div>
		);
	}
}
