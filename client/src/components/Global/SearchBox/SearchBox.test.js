import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchBox from './SearchBox';
import SearchResults from '../../Pages/SearchResults/SearchResults';

// Mock de datos de búsqueda
const mockData = {
    categories: ["Celulares y Teléfonos", "Accesorios para Celulares"],
    items: [
        {
            id: "MLA1636442398",
            title: "Cargador Fast Apple Original iPhone 13 13 Pro Max Usb-c 20w Color Blanco - Distribuidor Autorizado",
            price: { currency: "ARS", amount: 63639, decimals: "26" },
            picture: "http://http2.mlstatic.com/D_620616-MLA49003338062_022022-I.jpg",
            condition: "new",
            free_shipping: true,
        }
    ]
};

// Mock global fetch para devolver los datos correctos
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockData),
        })
    );
});

describe('SearchBox Component', () => {
    test('calls navigate on form submit with query and shows results', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<SearchBox />} />
                    <Route path="/items" element={<SearchResults />} />
                </Routes>
            </MemoryRouter>
        );

        // Simula escribir "iPhone" en el campo de búsqueda
        const searchInput = screen.getByPlaceholderText(/Buscar productos, marcas y más.../i);
        fireEvent.change(searchInput, { target: { value: 'iPhone' } });

        // Simula el envío del formulario
        fireEvent.click(screen.getByRole('button'));

        // Verifica que el componente de resultados haya cargado los datos correctos
        await waitFor(() => {
            expect(screen.getByText(/Cargador Fast Apple Original/i)).toBeInTheDocument();
            expect(screen.getByText(/ARS 63639/)).toBeInTheDocument();
        });
    });
});

// Restaura el mock de fetch después de cada test
afterEach(() => {
    global.fetch.mockRestore();
});
