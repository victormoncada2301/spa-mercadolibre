import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Breadcrumb from '../../Global/Breadcrumb/Breadcrumb';
import './SearchResults.scss';

const SearchResults = () => {
    const location = useLocation();
    const [results, setResults] = useState(location.state?.results || []);
    const [categories, setCategories] = useState(location.state?.categories || []);
    const query = new URLSearchParams(location.search).get('search');

    useEffect(() => {
        if (location.state?.results && location.state?.categories) {
            setResults(location.state.results);
            setCategories(location.state.categories);
        } else if (query) {
            fetch(`/api/items?q=${query}`)
                .then((response) => response.json())
                .then((data) => {
                    setResults(data.items);
                    setCategories(data.categories);
                })
                .catch((error) => console.error('Error fetching data:', error));
        }
    }, [query, location.state]);

    return (
        <div className="search-results">
            <Breadcrumb categories={categories} />
            {/* Lista de resultados */}
            <ul className="item-list">
                {results.length > 0 ? (
                    results.map((item) => (
                        <li key={item.id} className="item">
                            <Link to={`/items/${item.id}`} className="item-link">
                                <div className="item-image">
                                    <img src={item.picture} alt={item.title} />
                                </div>
                                <div className="item-details">
                                    <div className="item-price">
                                        {item.price.currency} {item.price.amount}
                                        {item.free_shipping && <span className="free-shipping">Envío gratis</span>}
                                    </div>
                                    <div className="item-title">{item.title}</div>
                                    <div className="item-location">Capital Federal</div>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No se encontraron resultados para "{query}".</p>
                )}
            </ul>
        </div>
    );
};

export default SearchResults;