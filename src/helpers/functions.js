export default function stringContainsNumber(input) {
	let string = String(input);
	for (let i = 0; i < string.length; i++) {
		if (!isNaN(string.charAt(i)) && !(string.charAt(i) === ' ')) {
			return true;
		}
	}
	return false;
}
