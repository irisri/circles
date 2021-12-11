import axios from "axios";

const OFFICIALURL = "https://official-joke-api.appspot.com";
const HEROKUURL = "https://karljoke.herokuapp.com";

async function get10Jokes(contextJokes) {
	// try {
	// 	let tenJokes = await axios.get(OFFICIALURL + "/jokes/programming/ten");
	// } catch (err) {
	// 	console.log(err);
	try {
		let tenJokes = await axios.get(HEROKUURL + "/jokes/programming/ten");
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
