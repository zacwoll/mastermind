#!/usr/bin/node
// Guess my number

const prompt = require('prompt-sync')({ sigint: true });

// Random number from 0000 - 9999
let master_code = Math.floor(Math.random() * 9999);
// master_code = 1234;

let player_count = 0;
while (player_count < 1) {
  player_count = prompt('How many players? (1 or 2): ');
  if (player_count > 2) {
    console.log('That\'s not 1 or 2, I didn\'t understand, try again');
    player_count = 0;
  }
}

if (player_count == 2) {
  console.log('There are 2 players. Choose one player to generate the number.');
  master_code = prompt('When you are ready, input a 4 digit number here:');
  console.clear();
  master_code = Number(master_code);
}

// TODO: I've set master_code to 1234, remove when ready
// master_code = 1440;

let found_correct_seq = false;
let ctr = 0;
let hint_ctr = 0;

while (!found_correct_seq) {
  const guess = prompt('Guess a number from 0000 - 9999: ');
  ctr++;

  /* let correct store the correctness of the guess */
  const correct_array = ['X', 'X', 'X', 'X'];
  let correct = 0;
  let digit_ctr = 0;

  const master_order = [];
  const sorted_master = [];
  let sorted_guess = [];
  for (let i = 3; i >= 0; i--) {
    const digit = Math.floor(master_code / (10 ** i) % 10);
    master_order.push(digit);
    sorted_master.push(digit);
    sorted_guess.push(Number(guess[i]));
  }
  sorted_master.sort(function (a, b) { return a - b; });
  sorted_guess = sorted_guess.sort(function (a, b) { return a - b; });

  // This determines which numbers are in the correct placement
  for (let i = 0; i < 4; i++) {
    digit = Number(guess[i]);

    if (digit === master_order[i]) {
      correct++;
      correct_array[i] = digit;
    }
    if (sorted_guess[i] === sorted_master[i]) { digit_ctr++; }
  }

  let digits_correct = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < sorted_master.length; j++) {
      if (sorted_guess[i] === sorted_master[j]) {
        digits_correct++;
        sorted_master.splice(j, 1);
        break;
      }
    }
  }

  // Debug statements
  // console.log(digits_correct);
  // console.log(sorted_guess.join(' '));
  // console.log(sorted_master.join(' '));
  // console.log('MO: ' + master_order.join(' '));

  if (Number(guess) === master_code) {
    console.log('Congrats, you got it!');
    console.log(`It took you ${ctr} tries!`);
    if (ctr === 1) {
      console.log('It only took you 1 try! You\'re a mastermind!');
    }
    found_correct_seq = true;
  } else if (guess === 'hint') {
    hint_ctr++;
    if (hint_ctr > 3) { hint_ctr = 3; console.log('But you only get 3 hints.')}
    console.log('X '.repeat(4 - hint_ctr) + master_order.slice(4 - hint_ctr).join(' '));
    ctr--;
  } else if (guess === 'giveup') {
	  console.log(`Sorry, you gave up. My number was ${master_code}`);
	  break;
  } else {
    console.log('Not quite the number.');
    console.log(`But you have ${correct} digits correct and in sequence!`);
    console.log(`You have ${digits_correct - correct} correct numbers out of sequence.`);
    if (ctr > 10) {
      console.log('Also these numbers in your input were correct.');
      console.log(correct_array.join(' '));
    }
    console.log();
  }

  // Hints
  if (ctr % 10 === 0 && found_correct_seq != true) {
    console.log('If you need a hint, input `hint`, they won\'t count against you.');
  }
}
