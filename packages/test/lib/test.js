"use strict";

function getProxy(origin) {
	const handler = {
		get() {
			trackSet.add(exec);
			return Reflect.get(...arguments);
		},
		set() {
			Reflect.set(...arguments);
			trackSet.forEach((reflect) => {
				reflect();
			});
			return true;
		},
	};
	return new Proxy(origin, handler);
}

function exec() {
	str = proxyObj.name + "---" + proxyObj.number;
	console.log("str:", str);
}

let obj = { name: "jss", number: "jx" };
let str = "init";
let trackSet = new Set();
const proxyObj = getProxy(obj);
exec();
proxyObj.name = "xixi";
