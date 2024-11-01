import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchResults from './SearchResults';

const mockData = {
    categories: ["Celulares y Teléfonos", "Accesorios para Celulares"],
    items: [
        {
            id: "MLA1636442398",
            title: "Cargador Fast Apple Original iPhone 13 13 Pro Max Usb-c 20w Color Blanco - Distribuidor Autorizado",
            price: { currency: "ARS", amount: 63639, decimals: "26" },
            picture: "http://http2.mlstatic.com/D_620616-MLA49003338062_022022-I.jpg",
            condition: "new",
            free_shipping: true
        },
        {
            id: "MLA1906911298",
            title: "Apple iPhone 11 (128 Gb) - Negro",
            price: { currency: "ARS", amount: 1027000, decimals: "00" },
            picture: "http://http2.mlstatic.com/D_656548-MLA46114829749_052021-I.jpg",
            condition: "new",
            free_shipping: true
        }
    ]
};

describe('SearchResults Component', () => {
    test('renders search results with categories and items', async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/search', state: { results: mockData.items, categories: mockData.categories } }]}>
                <Routes>
                    <Route path="/search" element={<SearchResults />} />
                </Routes>
            </MemoryRouter>
        );

        // Verifica que las categorías del breadcrumb se muestren
        for (const category of mockData.categories) {
            expect(await screen.findByText(new RegExp(category, 'i'))).toBeInTheDocument();
        }

        // Verifica que cada producto se muestre con su título y precio
        mockData.items.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(`${item.price.currency} ${item.price.amount}`)).toBeInTheDocument();
        });
    });
});
