import { formatTitle } from '../utils/formatTitle';

describe('formatTitle', () => {
  it('should format a single word title correctly', () => {
    expect(formatTitle('hello')).toBe('Hello');
  });

  it('should format a multi-word title correctly', () => {
    expect(formatTitle('hello world')).toBe('Hello World');
  });

  it('should format a title with punctuation correctly', () => {
    expect(formatTitle('hello, world!')).toBe('Hello, World!');
  });

  it('should format a title with numbers correctly', () => {
    expect(formatTitle('hello 123 world')).toBe('Hello 123 World');
  });

  it('should format a title with special characters correctly', () => {
    expect(formatTitle('hello @ world')).toBe('Hello @ World');
  });

  it('should format an empty string correctly', () => {
    expect(formatTitle('')).toBe('');
  });
});
