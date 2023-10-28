import test from 'ava';
import simplifyRanges from './index.js';

test('merges overlapping ranges', t => {
	const ranges = [[1, 2], [2, 3], [5, 8]];
	t.deepEqual(simplifyRanges(ranges), [[1, 3], [5, 8]]);
});

test('merges overlapping ranges #2', t => {
	const ranges = [[1, 5], [2, 3], [3, 8], [8, 8]];
	t.deepEqual(simplifyRanges(ranges), [[1, 8]]);
});

test('merges adjacent ranges', t => {
	const ranges = [[1, 2], [3, 4], [5, 6]];
	t.deepEqual(simplifyRanges(ranges), [[1, 6]]);
});

test('preserves single-number ranges', t => {
	const ranges = [[1, 2], [10, 10], [15, 16]];
	t.deepEqual(simplifyRanges(ranges), [[1, 2], [10, 10], [15, 16]]);
});

test('handles unsorted ranges', t => {
	const ranges = [[10, 12], [1, 3], [5, 7]];
	t.deepEqual(simplifyRanges(ranges), [[1, 3], [5, 7], [10, 12]]);
});

test('handles single range', t => {
	const ranges = [[1, 3]];
	t.deepEqual(simplifyRanges(ranges), [[1, 3]]);
});

test('handles empty input', t => {
	const ranges = [];
	t.deepEqual(simplifyRanges(ranges), []);
});

test('handles ranges that become single-number after merge', t => {
	const ranges = [[1, 2], [2, 3], [3, 4], [6, 6]];
	t.deepEqual(simplifyRanges(ranges), [[1, 4], [6, 6]]);
});

test('merges multi-step overlapping ranges', t => {
	const ranges = [[1, 2], [3, 4], [2, 3]];
	t.deepEqual(simplifyRanges(ranges), [[1, 4]]);
});

test('handles reversed ranges', t => {
	const ranges = [[1, 9], [4, 2]];
	t.deepEqual(simplifyRanges(ranges), [[1, 9]]);
});

test('handles mixed reversed and normal ranges', t => {
	const ranges = [[1, 3], [9, 5]];
	t.deepEqual(simplifyRanges(ranges), [[1, 3], [5, 9]]);
});

test('merges single-number and two-number ranges', t => {
	const ranges = [[1, 1], [2, 3], [4, 4]];
	t.deepEqual(simplifyRanges(ranges), [[1, 4]]);
});

test('handles separate but reversed ranges', t => {
	const ranges = [[9, 3], [15, 11]];
	t.deepEqual(simplifyRanges(ranges), [[3, 9], [11, 15]]);
});

test('handles large gaps between ranges', t => {
	const ranges = [[1, 2], [100, 101], [200, 300]];
	t.deepEqual(simplifyRanges(ranges), [[1, 2], [100, 101], [200, 300]]);
});

test('handles all single-number ranges', t => {
	const ranges = [[1, 1], [2, 2], [3, 3]];
	t.deepEqual(simplifyRanges(ranges), [[1, 3]]);
});

test('handles multiple same single-number ranges', t => {
	const ranges = [[1, 1], [1, 1], [1, 1]];
	t.deepEqual(simplifyRanges(ranges), [[1, 1]]);
});

test('handles negative numbers', t => {
	const ranges = [[-3, -1], [0, 2]];
	t.deepEqual(simplifyRanges(ranges), [[-3, 2]]);
});

test('handles mix of negative, zero and positive numbers', t => {
	const ranges = [[-3, 2], [5, 0]];
	t.deepEqual(simplifyRanges(ranges), [[-3, 5]]);
});

test('separateTwoNumberRanges option', t => {
	const ranges = [[1, 2], [4, 5], [7, 10]];
	t.deepEqual(simplifyRanges(ranges, {separateTwoNumberRanges: true}), [[1, 1], [2, 2], [4, 4], [5, 5], [7, 10]]);
});

test('separateTwoNumberRanges option - handles negative numbers', t => {
	const ranges = [[-3, -2], [1, 2]];
	t.deepEqual(simplifyRanges(ranges, {separateTwoNumberRanges: true}), [[-3, -3], [-2, -2], [1, 1], [2, 2]]);
});

test('separateTwoNumberRanges option - does not split large ranges', t => {
	const ranges = [[1, 20], [21, 40]];
	t.deepEqual(simplifyRanges(ranges, {separateTwoNumberRanges: true}), [[1, 40]]);
});

test('separateTwoNumberRanges option - handles all single-number ranges', t => {
	const ranges = [[1, 1], [2, 2], [3, 3]];
	t.deepEqual(simplifyRanges(ranges, {separateTwoNumberRanges: true}), [[1, 3]]);
});
