import React, { useEffect, useState } from "react";
import { jokeService } from "../services/jokeService";
import { JokeList } from "./JokeList";

export function JokeContainer() {
	const [allJokes, setAllJokes] = useState([]);

	const updateJoke = (jokeId, statusString) => {
		const jokeToUpdateIndex = allJokes.findIndex(
			(displayJoke) => displayJoke.id === jokeId
		);
		if (jokeToUpdateIndex !== -1) {
			let updatedJoke = allJokes[jokeToUpdateIndex];

			updatedJoke = {
				...updatedJoke,
				status: statusString,
				timer: false,
			};
			setAllJokes(
				allJokes.map((displayJoke) => {
					return displayJoke.id === jokeId ? updatedJoke : displayJoke;
				})
			);
		}
	};

	const removeFromDisplayJokes = () => {
		let changed = false;
		if (allJokes.length > 0) {
			let jokes = allJokes;
			jokes.forEach((joke) => {
				if (joke.timer && Date.now() - joke.timer >= 8000) {
					changed = true;
					joke.timer = false;
					joke.status = "removed";
				}
			});
			if (changed) setAllJokes(jokes);
		}
	};

	const get10Jokes = async () => {
		try {
			let getJokes = await jokeService.get10Jokes(allJokes);
			getJokes.forEach((joke) => {
				joke.status = "new";
				joke.timer = Date.now();
			});
			setAllJokes((prevState) => [...prevState, ...getJokes]);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		//componentWillMount
		get10Jokes();
	}, []);

	useEffect(() => {
		//componentDidUpdate
		const getJokesInterval = setInterval(() => {
			get10Jokes();
		}, 5000);
		const removeJokesInterval = setInterval(() => {
			removeFromDisplayJokes();
		}, 1000);
		return () => {
			clearInterval(removeJokesInterval);
			clearInterval(getJokesInterval);
		};
	}, [allJokes]);

	return allJokes.length > 0 ? (
		<div className="flex wrap">
			<JokeList jokes={allJokes} updateJoke={updateJoke} />
		</div>
	) : (
		<div>
			<h3 style={{ textAlign: "center" }}>No Cards!</h3>
		</div>
	);
}
