import "./App.css";
import { JokeContainer } from "./components/JokeContainer";

function App() {
	return (
		<div className="App main-container">
			<header>
				<h1>Iris Rifold - Circles</h1>
			</header>
			<div>
				<JokeContainer />
			</div>
		</div>
	);
}

export default App;
