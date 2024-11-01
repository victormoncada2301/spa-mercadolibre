import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import './SearchBox.scss';

const apiUrl = process.env.REACT_APP_API_URL;

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (query) {
            try {
                const response = await fetch(`${apiUrl}/api/items?q=${query}`);
                const data = await response.json();
                navigate(`/items?search=${query}`, { state: { results: data.items, categories: data.categories } });
            } catch (error) {
                console.error('Error al obtener los resultados de búsqueda:', error);
            }
        }
    };

    return (
        <div className="search-container">
            <Link to="/" className="logo-link">
                <img src={logo} alt="Mercado Libre Logo" className="logo" />
            </Link>
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
