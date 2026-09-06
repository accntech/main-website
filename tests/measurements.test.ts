import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fromMillimetres, toMillimetres, formatMeasurement, stepNumber } from '../src/lib/utils/measurements.ts';

test('converts inches to millimetres and back without changing physical margins', () => {
	assert.equal(toMillimetres(0.5, 'in'), 12.7);
	assert.equal(fromMillimetres(12.7, 'in'), 0.5);
	assert.equal(toMillimetres(10, 'mm'), 10);
	assert.ok(Math.abs(toMillimetres(fromMillimetres(10, 'in'), 'in') - 10) < 1e-12);
	assert.equal(formatMeasurement(12.7, 'in'), '0.5');
	assert.equal(formatMeasurement(10, 'in'), '0.3937');
	assert.equal(formatMeasurement(93.5, 'mm'), '93.5');
});

test('custom number steppers respect bounds and avoid floating-point tails', () => {
	assert.equal(stepNumber(0.1, 1, 0.05, 0, 2), 0.15);
	assert.equal(stepNumber(0.05, -1, 0.1, 0, 2), 0);
	assert.equal(stepNumber(1.95, 1, 0.1, 0, 2), 2);
	assert.equal(stepNumber(undefined, 1, 0.5, 0, 50), 0.5);
});
