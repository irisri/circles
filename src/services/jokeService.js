import axios from "axios";

const OFFICIALURL = "https://official-joke-api.appspot.com";
const HEROKUURL = "https://karljoke.herokuapp.com";

async function get10Jokes(contextJokes) {
	try {
		let tenJokes = await axios.get(HEROKUURL + "/jokes/programming/ten");
		return tenJokes.data.filter(
			(joke) => !contextJokes.find((contextJoke) => joke.id === contextJoke.id)
		);
		return tenJokes.data;
	} catch (err) {
		console.log(err);
	}
	// }

	// if (tenJokes) console.log(OFFICIALURL + "/jokes/programming/ten");
}

export const jokeService = {
	get10Jokes,
};
