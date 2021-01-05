/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words;
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		let uniqueWords = new Set(this.words);
		let wordChains = {};

		uniqueWords.forEach((word) => {
			wordChains[word] = [];
		});

		for (let i = 0; i < this.words.length; i++) {
			let currentWord = this.words[i];
			let nextWord = this.words[i + 1] || null;
			wordChains[currentWord].push(nextWord);
		}

		return wordChains;
	}

	/** return random text from chains */

	getText(numWords = 100) {
		let wordChains = this.makeChains(this.words);
		let firstWordIdx = Math.floor(Math.random() * Object.keys(wordChains).length);
		let firstWord = Object.keys(wordChains)[firstWordIdx];
		let nextWord;
		let text = firstWord;
		let i = 0;

		while (i < numWords - 1) {
			debugger;
			let wordsArray = wordChains[firstWord];
			let randomIdx = Math.floor(Math.random() * wordsArray.length);
      nextWord = wordsArray[randomIdx];
      
			if(nextWord === null) break;

			text += ` ${nextWord}`;
			firstWord = nextWord;
			i++;
		}
		return text;
	}
}

let mm = new MarkovMachine('the cat in the hat');
let text = mm.getText((numWords = 20));

console.log(text);
