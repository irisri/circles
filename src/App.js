import "./App.css";
import { JokeProvider } from "./contexts/jokeContext";
import { JokeList } from "./components/JokeList";

function App() {
	return (
		<JokeProvider>
			<div className="App main-container">
				<header>
					<h1>Iris Rifold - Circles</h1>
				</header>
				<div>
					<JokeList />
				</div>
			</div>
		</JokeProvider>
	);
}

export default App;
