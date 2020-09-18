#!/usr/bin/node
// This demonstrates the prompt syntax

const prompt = require('prompt-sync')({sigint: true});

const name = prompt('What is my name? ');
console.log(`Hey there ${name}`);
