import React, { useEffect, useState } from "react";
import { jokeService } from "../services/jokeService";
// import { JokeContext } from "../contexts/jokeContext";
import { JokeCard } from "./JokeCard";

export function JokeList(props) {
	// let { displayJokes, getJokes } = useContext(JokeContext);
	const [displayJokes, setDisplayJokes] = useState({ jokes: [] });
	let removeJokesTimers = [];

	const removeFromDisplayJokes = () => {
		console.log("remove", Date.now(), removeJokesTimers, displayJokes);

		if (displayJokes.jokes.length > 0) {
			const firstTimer = removeJokesTimers[0];
			const removeJokes = displayJokes.jokes.map((displayJoke) => {
				if (displayJoke.timer === firstTimer) {
					displayJoke.timer = false;
					displayJoke.status = "removed";
				}
			});

			const jokes = filterJokes(displayJokes.jokes, dontShowJokes);
			console.log(displayJokes, jokes);
			if (removeJokes.length > 0) removeJokes.pop();
			clearTimeout(firstTimer);
		}
	};

	const get10Jocks = async () => {
		try {
			let getJokes = await jokeService.get10Jokes(displayJokes.jokes);

			const timer = setTimeout(() => {
				console.log("timer");
				removeFromDisplayJokes();
				// 8000
			}, 21000);

			removeJokesTimers.push(timer);
			getJokes.forEach((joke) => {
				joke.status = "new";
				joke.timer = timer;
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

		jokeToUpdate.timer = false;
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
			get10Jocks();
			// 5000
		}, 20000);
		return () => {
			removeJokesTimers.forEach((timer) => clearTimeout(timer));
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
