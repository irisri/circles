import "./App.css";
import { JokeList } from "./components/JokeList";

function App() {
	return (
		<div className="App main-container">
			<header>
				<h1>Iris Rifold - Circles</h1>
			</header>
			<div>
				<JokeList />
			</div>
		</div>
	);
}

export default App;
