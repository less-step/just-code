#! /usr/bin/env node
"use strict";

function shared() {
	return "Hello shared ts";
}

console.log(shared());
console.log("less-step is created");
