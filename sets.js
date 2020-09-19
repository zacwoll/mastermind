#!/usr/bin/node
// Testing the return of Set().add()

let ballsac = new Set();

ballsac.add(0);

if (!ballsac.add(0))
	console.log('we did it!');
else
	console.log('the first add failed!');

if (!ballsac.add(1))
	console.log('we did it!');
else
	console.log('the second add failed!');
