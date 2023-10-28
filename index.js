export default function simplidyRanges(ranges, {separateTwoNumberRanges} = {}) {
	if (!Array.isArray(ranges)) {
		throw new TypeError(`Expected an array, got \`${typeof ranges}\`.`);
	}

	if (ranges.length === 0) {
		return [];
	}

	// Normalize ranges
	ranges = ranges
		.map(([start, end]) => start <= end ? [start, end] : [end, start])
		.sort((a, b) => a[0] - b[0]);

	const result = [ranges[0]];

	for (const [start, end] of ranges.slice(1)) {
		const [lastStart, lastEnd] = result.at(-1);

		if (start - 1 <= lastEnd) {
			const newEnd = Math.max(end, lastEnd);
			result[result.length - 1] = [lastStart, newEnd];
		} else {
			result.push([start, end]);
		}
	}

	if (separateTwoNumberRanges) {
		return result.flatMap(([start, end]) => start + 1 === end ? [[start, start], [end, end]] : [[start, end]]);
	}

	return result;
}
