const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const output = document.querySelector('.output');
const input = document.querySelector('#input');
const sound = document.getElementById('sound');
const button = document.querySelector('.search-button');

button.addEventListener('click', showResult);

function showResult() {
	let inputWord = document.getElementById('input').value;
	fetch(`${url}${inputWord}`)
		.then((response) => response.json())
		.then((result) => {
			output.innerHTML = `
			<div class="word">
				<h3>${inputWord}</h3>

				<button onclick="playSound()">
					<i class="fa-solid fa-volume-high"></i>
				</button>
			</div>

			<div class="details">
				<p>${result[0].meanings[0].partOfSpeech}</p>
				<p>${result[0].phonetic}</p>
			</div>

			<p class="word-meaning">
				${result[0].meanings[0].definitions[0].definition}
			</p>

			<p class="word-example">
			${result[0].meanings[0].definitions[0].example || ""}
			</p>`;

			sound.setAttribute('src', `${result[0].phonetics[0].audio}`);
		})
		.catch(() => {
			output.innerHTML = `<h3 class="error">Try another word</h3>`;
		})
};

input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		showResult();
	}
});


function playSound() {
	sound.play();
}