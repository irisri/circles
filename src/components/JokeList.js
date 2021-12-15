import React, { useEffect, useState } from "react";
import { jokeService } from "../services/jokeService";
import { JokeCard } from "./JokeCard";

export function JokeList({ jokes, updateJoke }) {
	const showJokes = (jokes) => {
		return jokes.map((joke) => {
			if (joke.status !== "removed")
				return <JokeCard key={joke.id} joke={joke} updateJoke={updateJoke} />;
		});
	};

	if (jokes) {
		return (
			<div>
				<div className="flex wrap">{showJokes(jokes)}</div>
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
