export function stringContainsNumber(input) {
	let string = String(input);
	for (let i = 0; i < string.length; i++) {
		if (!isNaN(string.charAt(i)) && !(string.charAt(i) === ' ')) {
			return true;
		}
	}
	return false;
}

export function isEmptyObject(obj) {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}

	return true;
}
