const jokeEl = document.getElementById("joke");
const get_joke = document.getElementById("get_joke");
const theme = document.getElementById("theme");
const bodyTheme = document.getElementById("bodyTheme");

get_joke.addEventListener("click", generateJoke);

generateJoke();

async function generateJoke() {
	const jokeRes = await fetch("https://v2.jokeapi.dev/joke/Programming,Pun,Spooky?blacklistFlags=nsfw,political,racist,sexist", {
		headers: {
			Accept: "application/json",
		},
	});
	const jokeObj = await jokeRes.json();
	const joke = jokeObj.joke;
	if (joke === undefined) {
		const joke1 = jokeObj.setup;
		const joke2 = jokeObj.delivery;
		jokeEl.innerHTML = `${joke1} ${joke2}`;
	} else {
		jokeEl.innerHTML = jokeObj.joke;
	}
}

theme.addEventListener("click", function () {
	bodyTheme.classList.toggle("dark");
	if (theme.innerHTML === "brightness_4") {
		theme.innerHTML = "brightness_7";
	} else {
		theme.innerHTML = "brightness_4";
	}
});
