import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component with SearchBox', () => {
    render(<App />);
    const searchPlaceholder = screen.getByPlaceholderText('Buscar productos, marcas y más...');
    expect(searchPlaceholder).toBeInTheDocument();
});

