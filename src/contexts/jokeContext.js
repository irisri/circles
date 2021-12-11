/* eslint-disable no-unused-vars */
import React, { useState, createContext } from "react";
import { jokeService } from "../services/jokeService";

export const JokeContext = createContext();

export const JokeProvider = (props) => {
	const [displayJokes, setDisplayJokes] = useState({ jokes: [] });
	let removeJokesTimers = [];
	let dontShowJokes = [];

	const filterJokes = (jokes, compereToJokes) => {
		return jokes.filter(
			(joke) =>
				!compereToJokes.find((compereToJokes) => joke.id === compereToJokes.id)
		);
	};

	const updateJoke = (joke) => {
		const jokeContext = displayJokes.jokes.find(
			(displayJoke) => displayJoke.id === joke.id
		);
		delete jokeContext.timer;
		console.log(joke.id, jokeContext);
		setDisplayJokes((prevState) => {
			console.log(...prevState.jokes, ...jokeContext);
			return {
				jokes: [...prevState.jokes, ...jokeContext],
			};
		});
	};

	const getJokes = async () => {
		console.log("get", Date.now());
		try {
			let getJokes = await jokeService.get10Jokes(displayJokes.jokes);
			if (displayJokes.jokes.length > 0) {
				getJokes = filterJokes(getJokes, displayJokes.jokes);
			}
			if (dontShowJokes.length > 0) {
				console.log("dont", getJokes, dontShowJokes);
				getJokes = filterJokes(getJokes, dontShowJokes);
				console.log(getJokes);
			}

			const timer = setTimeout(() => {
				console.log("timer");
				removeFromDisplayJokes();
				// 8000
			}, 21000);

			removeJokesTimers.push(timer);
			getJokes.forEach((joke) => (joke.timer = timer));
			console.log(removeJokesTimers, getJokes);

			setDisplayJokes((prevState) => {
				return {
					jokes: [...prevState.jokes, ...getJokes],
				};
			});
		} catch (err) {
			console.log(err);
		}
	};

	const removeFromDisplayJokes = () => {
		console.log(Date.now(), removeJokesTimers, displayJokes);

		if (displayJokes.jokes.length > 0) {
			const firstTimer = removeJokesTimers[0];
			const removeJokes = displayJokes.jokes.filter((displayJoke) => {
				console.log(firstTimer, displayJoke.timer);
				return displayJoke.timer === firstTimer;
			});
			console.log(removeJokes);
			dontShowJokes.push(...removeJokes);

			const jokes = filterJokes(displayJokes.jokes, dontShowJokes);
			console.log(displayJokes, jokes);
			if (removeJokes.length > 0) removeJokes.pop();
			clearTimeout(firstTimer);
		}

		// dontShowJokes.push();
		// const displayJokesIndex = displayJokes.jokes.findIndex(
		// 	(displayJoke) => displayJoke.id === joke.id
		// );
		// const newDisplayJokes = displayJokes.jokes;
		// newDisplayJokes.splice(displayJokesIndex, 1);
		// setDisplayJokes({ jokes: newDisplayJokes });
	};

	return (
		<JokeContext.Provider
			value={{
				getJokes,
				displayJokes,
				updateJoke,
			}}>
			{props.children}
		</JokeContext.Provider>
	);
};
