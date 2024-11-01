import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBox from './SearchBox';

// Mock de `useNavigate`
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

// Configuración de `fetch`
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                items: [{ id: 1, title: 'Producto de prueba' }],
                categories: ['Categoría 1', 'Categoría 2']
            })
    })
);

describe('SearchBox Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        fetch.mockClear();
    });

    it('renders correctly with input and button', () => {
        render(
            <MemoryRouter>
                <SearchBox />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Buscar productos, marcas y más...')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls navigate on form submit with query', async () => {
        render(
            <MemoryRouter>
                <SearchBox />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
        fireEvent.change(input, { target: { value: 'Apple' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Verificar que fetch fue llamado correctamente
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/items?q=Apple'));
        expect(mockNavigate).toHaveBeenCalledWith('/items?search=Apple', expect.any(Object));
    });

    it('clears input and navigates home on logo click', () => {
        render(
            <MemoryRouter>
                <SearchBox />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText('Buscar productos, marcas y más...');
        fireEvent.change(input, { target: { value: 'Apple' } });

        const logo = screen.getByAltText('Mercado Libre Logo');
        fireEvent.click(logo);

        expect(input.value).toBe('');
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
