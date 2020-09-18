#!/usr/bin/node
// Guess my number

const prompt = require('prompt-sync')({sigint: true});

// Random number from 1000 - 9999
let master_code = Math.floor(Math.random() * 8999) + 1000;

// TODO: I've set master_code to 1234, remove when ready
//master_code = 1234;

let master_set = [];
for (let i = 3; i >= 0; i--) {
	master_set.push(Math.floor(master_code / (10 ** i) % 10));
}

let found_correct_seq = false;
let ctr = 0;

while (!found_correct_seq) {
	let guess = prompt('Guess a number from 1000 - 9999: ');
	ctr++;

	//guess = Number(guess);

	/* let correct store the correctness of the guess */
	let input_set = new Set();
	let exists = 0;
	let correct = 0;

	for (let i = 0; i < 4; i++) {
		input_set.add(Math.floor(guess / (10 ** i) % 10));
	}

	// This determines which numbers are in the guess, not the order
	for (let i = 0; i < 4; i++) {
		if (input_set.has(master_set[i])) {
			exists++;
		}
	}

	// This can determine which numbers are in the right spot
	for (let i = 0; i < 4; i++)
	{
		if (Number(guess[i]) === master_set[i]) {
			correct++;
		}
	}
	
	// Last test print before results
	/*
	console.log("correct = ");
	for (let i = 0; i < 4; i++) {
		console.log(correct[i]);
	}
	*/

	if (Number(guess) === master_code) {
		console.log('Congrats, you got it!');
		console.log(`It took you ${ctr} tries!`);
		found_correct_seq = true;
	} else {
		console.log('Not quite the number.');
		console.log(`But you have ${correct} digits correct and in sequence!`);
		console.log(`Also, you have ${exists - correct} digits correct out of sequence`)
	}
}
