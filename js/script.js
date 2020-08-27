const speechSynthesis = window.speechSynthesis

const voicesSelect = document.getElementById('voices')
const rate = document.getElementById('rate')
const pitch = document.getElementById('pitch')
const text = document.getElementById('text')

let voices = []

// Генерация голосов
const generateVoices = () => {
	voices = speechSynthesis.getVoices()	

	const voicesList = voices
	.map((voice, index) => `<option value=${index}>${voice.name} (${voice.lang})</option>`)
	.join('')

	voicesSelect.innerHTML = voicesList
}

// Старт
const speak = () => {
	if (speechSynthesis.speaking) {
		console.error('speechSynthesis.speaking')
		return
	}
	if (text.value !== '') {
		const ssUtt = new SpeechSynthesisUtterance(text.value)

		ssUtt.addEventListener('end', (event) => console.warn('ssUtt end'))
		ssUtt.addEventListener('error', (event) => console.warn('ssUtt error'))


		ssUtt.voice = voices[voicesSelect.value]
		ssUtt.pitch = pitch.value
		ssUtt.rate = rate.value

		speechSynthesis.speak(ssUtt)
	}
}

generateVoices();

document.getElementById('btn-stop').addEventListener('click', () => speechSynthesis.cancel())
document.getElementById('btn-start').addEventListener('click', speak)

rate.addEventListener('change', () => document.querySelector('.rate-value').textContent = rate.value)
pitch.addEventListener('change', () => document.querySelector('.pitch-value').textContent = pitch.value)
voicesSelect.addEventListener('change', speak)

speechSynthesis.addEventListener('voiceschanged', generateVoices)