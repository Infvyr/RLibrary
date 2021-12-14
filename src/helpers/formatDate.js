export function formatDate(t) {
	const TIMESTAMP = new Date(t * 1000);
	const FULLDATE = new Date(t);
	const day = TIMESTAMP.toLocaleDateString('default', { day: '2-digit' });
	let month = TIMESTAMP.toLocaleDateString('default', { month: 'short' });
	let year = TIMESTAMP.toLocaleDateString('default', { year: 'numeric' });

	if (typeof t === 'number') return `${day}/${month}/${year}`;

	if (typeof t === 'object' || t === 'string')
		return `${FULLDATE.toLocaleDateString('default', {
			day: '2-digit',
		})}/${FULLDATE.toLocaleDateString('default', {
			month: 'short',
		})}/${FULLDATE.toLocaleDateString('default', { year: 'numeric' })}`;
}
