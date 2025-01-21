import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders search input and button', () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    expect(
      screen.getByPlaceholderText('Search for movies...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('button should be disabled when input is empty', () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeDisabled();
  });

  it('button should be enabled when input has value', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await userEvent.type(searchInput, 'test movie');
    expect(searchButton).toBeEnabled();
  });

  it('trims whitespace from input value', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, '   test movie   ');

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeEnabled();
  });

  it('calls onSearch with formatted title when form is submitted', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, 'star wars');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Star Wars');
  });

  it('prevents default form submission behavior', async () => {
    const mockOnSearch = vi.fn();

    // Render the component
    const { container } = render(
      React.createElement(SearchBar, { onSearch: mockOnSearch })
    );

    // Type a search term
    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, 'test movie');

    // Get the form
    const form = screen.getByTestId('search-form');

    // Create a spy on the form's submit event
    const preventDefaultSpy = vi.fn();

    // Simulate form submission with a custom event
    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true,
    });

    // Add a preventDefault method to the event
    Object.defineProperty(submitEvent, 'preventDefault', {
      value: preventDefaultSpy,
      writable: true,
      configurable: true,
    });

    // Dispatch the custom submit event
    form.dispatchEvent(submitEvent);

    // Verify that preventDefault was called
    expect(preventDefaultSpy).toHaveBeenCalled();

    // Verify that onSearch was called with the formatted title
    expect(mockOnSearch).toHaveBeenCalledWith('Test Movie');
  });

  it('maintains input value after form submission', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, 'test movie');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(searchInput).toHaveValue('test movie');
  });

  it('does not call onSearch with empty input', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('trims leading and trailing whitespace from input value', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, '   test movie   ');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Test Movie');
  });

  it('calls onSearch with multiple words', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, 'star wars episode iv');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Star Wars Episode Iv');
  });

  it('calls onSearch with special characters', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, 'star wars: episode iv');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Star Wars: Episode Iv');
  });

  it('calls onSearch with numbers', async () => {
    const mockOnSearch = vi.fn();
    render(React.createElement(SearchBar, { onSearch: mockOnSearch }));

    const searchInput = screen.getByPlaceholderText('Search for movies...');
    await userEvent.type(searchInput, 'star wars 1977'); // Simulate user input with spaces

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton); // Simulate form submission

    expect(mockOnSearch).toHaveBeenCalledWith('Star Wars 1977'); // Verify the output
  });
});
