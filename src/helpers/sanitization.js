export const escapeRegExp = value =>
	value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export const removeExtraSpace = s => s.trim().split(/ +/).join(' ');
