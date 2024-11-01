import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

const Breadcrumb = ({ categories }) => {
    return (
        <nav className="breadcrumb">
            {categories.map((category, index) => (
                <span key={index} className="breadcrumb-item">
                    {index !== categories.length - 1 ? (
                        <Link to={`/search?category=${category}`}>{category}</Link>
                    ) : (
                        <span>{category}</span>
                    )}
                    {index < categories.length - 1 && ' > '}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
