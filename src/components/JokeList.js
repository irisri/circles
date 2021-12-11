import React, { useEffect, useState } from "react";
import { jokeService } from "../services/jokeService";
import { JokeCard } from "./JokeCard";

export function JokeList(props) {
	const [allJokes, setAllJokes] = useState([]);

	const updateJoke = (jokeId, statusString) => {
		const jokeToUpdateIndex = allJokes.findIndex(
			(displayJoke) => displayJoke.id === jokeId
		);

		console.log(jokeToUpdateIndex, statusString);
		if (jokeToUpdateIndex !== -1) {
			clearTimeout(allJokes[jokeToUpdateIndex].timer);
			let updatedJoke = allJokes[jokeToUpdateIndex];
			updatedJoke = {
				...updatedJoke,
				status: statusString,
				timer: false,
			};

			setAllJokes(
				allJokes.map((displayJoke) => {
					displayJoke.if === jokeId ? updatedJoke : displayJoke;
				})
			);
		}
	};

	const removeFromDisplayJokes = (jokeId) => {
		console.log("remove", jokeId, allJokes);

		if (allJokes.length > 0) {
			updateJoke(jokeId, "removed");
		}
	};

	const get10Jokes = async () => {
		console.log("get");
		try {
			let getJokes = await jokeService.get10Jokes(allJokes);
			getJokes.forEach((joke) => {
				const removeJokeTimer = setTimeout(() => {
					console.log("timer", joke);
					removeFromDisplayJokes(joke.id);
				}, 3000);
				joke.status = "new";
				joke.timer = removeJokeTimer;
			});

			setAllJokes((prevState) => {
				return [...allJokes, ...getJokes];
			});
			console.log(allJokes);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		get10Jokes();
		const getJokesInterval = setInterval(() => {
			get10Jokes();
		}, 5000);
		return () => {
			allJokes.forEach((displayJoke) => clearTimeout(displayJoke.timer));
			clearInterval(getJokesInterval);
		};
	}, []);

	const showJokes = (jokes) => {
		return jokes.map((joke) => {
			if (joke.status !== "removed")
				return <JokeCard key={joke.id} joke={joke} updateJoke={updateJoke} />;
		});
	};

	if (allJokes.length > 0) {
		return (
			<div>
				<div className="flex wrap">{showJokes(allJokes)}</div>
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
