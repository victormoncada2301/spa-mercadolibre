import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/items?search=${query}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-box">
            <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Buscar</button>
        </form>
    );
};

export default SearchBox;