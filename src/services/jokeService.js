import axios from "axios";

// The first one don't work - Server Error
// const OFFICIALURL = "https://official-joke-api.appspot.com";
const HEROKUURL = "https://karljoke.herokuapp.com";

async function get10Jokes(stateJokes) {
	try {
		let tenJokes = await axios.get(HEROKUURL + "/jokes/programming/ten");
		return tenJokes.data.filter(
			(joke) => !stateJokes.find((stateJoke) => joke.id === stateJoke.id)
		);
	} catch (err) {
		console.log(err);
	}
}

export const jokeService = {
	get10Jokes,
};
