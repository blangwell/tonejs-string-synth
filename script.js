const h1 = document.querySelector('h1');
const notesInput = document.querySelector('#notes');
const playBtn = document.querySelector('#play-btn');
const noteForm = document.querySelector('#note-form');

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
	const notes = string.split('').map(char => notesToHz[char]);

	let seq = new Tone.Sequence(function(time, note) {
		synth.triggerAttackRelease(note, 0.1, time);
		console.log(note);
	}, [...notes], "4n").start(0);
	seq.loop = false;

	Tone.Transport.start();
}

noteForm.addEventListener('submit', e => {
	/* 
	NOTE: on Chrome I consistently receive an error that 
	the AudioContext is suspended despite invoking 
	Transport.start() in the playSequence function
	I invoke Tone.start() directly to avoid this
	*/
	e.preventDefault();

	Tone.start();
	console.log(notesInput.value);
	notesInput.value ? playSequence(notesInput.value) :
	playSequence('cde');
});