const guessInput = document.getElementById("guess_input")
const guessBtn = document.getElementById("guess_btn")
const guessHistory = document.getElementById("guess_history")
const guessResult = document.getElementById("guess_result")
const gameOver = document.getElementById("game_over")
const gameWon = document.getElementById("game_won")
const restartBtn = document.getElementById("restart_btn")

/**
* @param {number} min
* @param {number} max
*/
function randInt(min, max) {
	return Math.round(
		Math.random() * (max - min) + min
	)
}

class Game {
	static MAX_ATTEMPTS = 10

	#answer = randInt(0, 100)
	#attempts = 0

	constructor() {
		this.#cleanUp()
		this.#initDOMEvents()
	}

	/**
	* @param {number} n
	*/
	#tryGuess(n) {
		const isCorrect = n === this.#answer
		
		if (isCorrect) {
			this.#deInitDOMEvents()
			return gameWon.classList.remove("hidden")
		} else {
			this.#attempts++
		}

		this.#setGuessResult(n)
		this.#appendHistoryRecord(n)

		if (this.#attempts >= Game.MAX_ATTEMPTS) {
			this.#deInitDOMEvents()
			gameOver.classList.remove("hidden")
		}

		console.log(`CORRECT: ${isCorrect}`)
	}

	/**
	* @param {number} guess
	*/
	#setGuessResult(guess) {
		const isGt = guess > this.#answer

		guessHistory.classList.remove("hidden")
		guessResult.classList.remove("hidden")

		if (isGt) {
			guessResult.textContent = `Wybrales zbyt duza liczbe - sprobuj jeszcze raz!`
		} else {
			guessResult.textContent = `Wybrales za mala liczbe - sprobuj jeszcze raz!`
		}
	}

	#initDOMEvents() {
		guessBtn.onclick = () => this.#tryGuess(
			guessInput.valueAsNumber
		)

		restartBtn.onclick = () => this.restart()
	}

	#deInitDOMEvents() {
		guessBtn.onclick = null
	}

	/**
	* @param {number} n 
	*/
	#appendHistoryRecord(n) {
		const span = document.createElement("span")
		span.textContent = `${n}, `
		guessHistory.append(span)
	}
	

	restart() {
		this.#attempts = 0
		this.#answer = randInt(0, 100)
		this.#cleanUp()
		this.#initDOMEvents()
	}

	#cleanUp() {
		gameOver.classList.add("hidden")
		gameWon.classList.add("hidden")
		guessResult.classList.add("hidden")
		guessHistory.classList.add("hidden")
		guessInput.valueAsNumber = undefined
		guessHistory.textContent = ""
	}
}

new Game()
