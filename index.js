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

let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

let speechContainer = document.querySelector("#talk");

const changeIcon = function () {
	if (speechContainer.innerHTML === "volume_off") {
		speechContainer.innerHTML = "volume_up";
	} else {
		speechContainer.innerHTML = "volume_off";
	}
};

const changeColor = function () {
	let element = document.getElementById("talk");
	element.classList.toggle("clickColor");
};
let flag = 0;
document.querySelector(".play").addEventListener("click", () => {
	speech.text = document.querySelector("#joke").innerHTML;
	if (flag === 0) {
		flag = 1;
		changeColor();
		changeIcon();
		window.speechSynthesis.speak(speech);
		speech.addEventListener("end", function () {
			flag = 0;
			changeIcon();
			changeColor();
		});
	} else {
		flag = 0;
		window.speechSynthesis.cancel();
		changeIcon();
		changeColor();
	}
	// speechContainer.classList.remove("play");
	// speechContainer.classList.add("stop");

	// window.speechSynthesis.speak(speech);
	// changeIcon();
});
