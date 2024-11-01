import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading-spinner" role="status" aria-label="Loading">
            <div className="spinner"></div>
        </div>
    );
};

export default Loading;
