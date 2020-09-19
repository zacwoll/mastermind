#!/usr/bin/node
// Guess my number

const prompt = require('prompt-sync')({sigint: true});

// Random number from 0000 - 9999
let master_code = Math.floor(Math.random() * 9999);

// TODO: I've set master_code to 1234, remove when ready
master_code = 1440;

let master_order = [];
let master_set = new Set();
for (let i = 3; i >= 0; i--) {
	let digit = Math.floor(master_code / (10 ** i) % 10);
	master_order.push(digit);
	master_set.add(digit)
}

let found_correct_seq = false;
let ctr = 0;
let hint_ctr = 0;

while (!found_correct_seq) {
	let guess = prompt('Guess a number from 0000 - 9999: ');
	ctr++;

	/* let correct store the correctness of the guess */
	let repeat_set = new Set();
	let uniques = 0;
	let correct = 0;
	let repeats = 0;

	// This determines which numbers are in the guess, not the order
	for (let i = 0; i < 4; i++) {
		digit = Number(guess[i]);

		if (Number(digit) === master_order[i]) {
			correct++;
		}

		if (master_set.has(digit) && !repeat_set.has(digit)) {
			uniques++;
			repeat_set.add(digit);
		} else if (repeat_set.has(digit)) {
			repeats++;
		}
	}

	console.log(`u: ${uniques}, r: ${repeats}`);

	if (Number(guess) === master_code) {
		console.log('Congrats, you got it!');
		console.log(`It took you ${ctr} tries!`);
		found_correct_seq = true;
	} else if (guess === 'hint') {
		hint_ctr++;
		if (hint_ctr > 3)
			hint_ctr = 3;
		console.log('X '.repeat(4 - hint_ctr) + master_order.slice(4 - hint_ctr).join(' '));
		ctr--;
	} else {
		console.log('Not quite the number.');
		console.log(`But you have ${uniques + repeats} digits correct, ${correct} are in sequence!`);
	}

	// Hints
	if (ctr % 10 === 0 && found_correct_seq != true) {
		console.log('If you need a hint, input `hint`');
	}
}
