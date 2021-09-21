let synthOnline = false;

const playSequence = string => {
	if (synthOnline === false) return 'Synth is currently offline!';
	else {
		const synth = new Tone.Synth().toDestination();
		const notesToHz = {
			c: 261.626,
			d: 293.665,
			e: 329.628,
			f: 349.228,
			g: 391.995,
			a: 440.000,
			b: 493.883
		};

		let count = 0;
		let notesArray = string.split('');
		let lastNote = notesArray.length;

		notesArray = notesArray.map(char => {
			if (char === " ") return 0;
			else return notesToHz[char] ?? 100
		});

		let sequence = new Tone.Sequence((time, note) => {
			synth.triggerAttackRelease(note, 0.1, time);
			count++;
			if (count === lastNote) {
				sequence.stop();
				Tone.Transport.stop();
			}
		}, [...notesArray], "4n").start(0);

		sequence.loop = false;
		Tone.Transport.start();
		return `Playing: ${string}`;
	}
}

const startSynthButton = document.querySelector('#start-synth-btn');

startSynthButton.addEventListener('click', () => {
	synthOnline = true;
	Tone.start();
	console.clear();
	console.log('Happy Synthing!');

	const messageElem = document.querySelector('.message');
	messageElem.innerText = "Synth Online!";
	messageElem.classList.remove('offline');
	startSynthButton.style.display = "none";
});