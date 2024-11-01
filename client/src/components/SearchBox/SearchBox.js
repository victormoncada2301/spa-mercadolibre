import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import './SearchBox.scss';

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
        <div className="search-container">
            <img src={logo} alt="Mercado Libre Logo" className="logo" />
            <form onSubmit={handleSubmit} className="search-box">
                <input
                    type="text"
                    placeholder="Buscar productos, marcas y más..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </div>
    );
};

export default SearchBox;
