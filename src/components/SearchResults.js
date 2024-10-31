import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('search');

    useEffect(() => {
        if (query) {
            fetch(`/api/items?q=${query}`)
                .then((response) => response.json())
                .then((data) => {
                    setResults(data.items.slice(0, 4));
                    setCategories(data.categories);
                });
        }
    }, [query]);

    return (
        <div className="search-results">
            <div className="breadcrumb">{categories.join(' > ')}</div>
            <ul>
                {results.map((item) => (
                    <li key={item.id}>
                        <Link to={`/items/${item.id}`}>
                            <img src={item.picture} alt={item.title} />
                            <div>{item.title}</div>
                            <div>{item.price.currency} {item.price.amount}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;