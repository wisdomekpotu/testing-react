import React, { useState } from 'react';
import { formatTitle } from '../utils/formatTitle';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    const formattedTitle = formatTitle(trimmedSearchTerm);
    onSearch(formattedTitle);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setIsDisabled(inputValue.trim() === '');
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 max-w-2xl mx-auto'>
      <input
        type='text'
        name='search'
        data-testid='search-form'
        placeholder='Search for movies...'
        className='input input-bordered w-full'
        value={searchTerm}
        onChange={handleInputChange}
        required
      />
      <button type='submit' className='btn btn-primary' disabled={isDisabled}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
