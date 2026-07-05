import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query');

    if (typeof query !== 'string') {
      return;
    }

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      toast.error('Please enter a search query');
      return;
    }

    onSubmit(trimmedQuery);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="Search movies..."
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}