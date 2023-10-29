export default function simplifyRanges(ranges, {separateTwoNumberRanges} = {}) {
	if (!Array.isArray(ranges)) {
		throw new TypeError(`Expected an array, got \`${typeof ranges}\`.`);
	}

	if (ranges.length === 0) {
		return [];
	}

	// Normalize ranges
	const result = ranges
	.map(([start, end]) => start <= end ? [start, end] : [end, start])
	.sort((a, b) => a[0] - b[0])
	.reduce((acc, [start, end]) => {
	  if (acc.length > 0) {
		const [lastStart, lastEnd] = acc[acc.length - 1];
		if (start - 1 <= lastEnd) {
			const newEnd = Math.max(end, lastEnd);
			acc[acc.length - 1] = [lastStart, newEnd];
		  return acc;
		}
	  }
	  acc.push([start, end]);
	  return acc;
	}, []);
  
  	if (separateTwoNumberRanges) {
		return result.flatMap(([start, end]) => start + 1 === end ? [[start, start], [end, end]] : [[start, end]]);
  	}
  
  	return result;
}
