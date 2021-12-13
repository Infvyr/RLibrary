export function formatDate(timestamp) {
	const t = new Date(timestamp * 1000);
	const day = t.toLocaleDateString('default', { day: '2-digit' });
	let month = t.toLocaleDateString('default', { month: 'short' });
	let year = t.toLocaleDateString('default', { year: 'numeric' });

	return `${day}/${month}/${year}`;
}
