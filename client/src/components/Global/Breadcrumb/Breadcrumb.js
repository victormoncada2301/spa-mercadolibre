import React from 'react';
import './Breadcrumb.scss';

const Breadcrumb = ({ categories }) => {
    return (
        <nav className="breadcrumb">
            {categories.map((category, index) => (
                <span key={index} className="breadcrumb-item">
                    {category}
                    {index < categories.length - 1 && ' > '}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
