const noteForm = document.querySelector('#note-form');
const notesInput = document.querySelector('#notes');
const playBtn = document.querySelector('#play-btn');

const notesToHz = {
	c: 261.626,
	d: 293.665,
	e: 329.628,
	f: 349.228,
	g: 391.995,
	a: 440.000,
	b: 493.883
}

const synth = new Tone.Synth().toDestination(); 
const now = Tone.now();

function playSequence(string) {
	let count = 0;
	let notes = string.split('');
	let lastNote = notes.length;
	notes = notes.map(char => notesToHz[char] ?? 100);

	let seq = new Tone.Sequence((time, note) => {
		synth.triggerAttackRelease(note, 0.1, time);
		count++;
		if (count === lastNote) {
			seq.stop();
			Tone.Transport.stop();
		}
	}, [...notes], "4n").start(0);

	seq.loop = false;
	Tone.Transport.start();
}

noteForm.addEventListener('submit', e => {
	e.preventDefault(); 
	Tone.start();
	notesInput.value ? playSequence(notesInput.value) : playSequence('cde');
});