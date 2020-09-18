#!/usr/bin/node
// Guess my number

const prompt = require('prompt-sync')({sigint: true});

// Random number from 1 - 10
const numberToGuess = Math.floor(Math.random() * 8999) + 1000;

let found_correct_number = false;

while (!found_correct_number) {
	let guess = prompt('Guess a number from 1000 - 9999: ');

	guess = Number(guess);

	if (guess === numberToGuess) {
		console.log('Congrats, you got it!');
		found_correct_number = true;
	} else {
		console.log(`Sorry, my number was ${numberToGuess}`);
		found_correct_number = true;
	}
}
