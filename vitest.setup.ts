import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Safer matchers extension
if (typeof matchers === 'object' && matchers !== null) {
  expect.extend(matchers);
} else {
  console.error('Jest DOM matchers could not be loaded');
}

// Enhanced cleanup
afterEach(() => {
  try {
    cleanup();
  } catch (error) {
    console.warn('Cleanup failed:', error);
  }
});
