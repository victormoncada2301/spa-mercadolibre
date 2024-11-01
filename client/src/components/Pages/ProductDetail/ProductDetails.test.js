import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const mockData = {
    author: {
        name: "Victor",
        lastname: "Moncada",
    },
    item: {
        id: "MLA1906911298",
        title: "Apple iPhone 11 (128 Gb) - Negro",
        price: {
            currency: "ARS",
            amount: 1027000,
            decimals: "00",
        },
        picture: "http://http2.mlstatic.com/D_656548-MLA46114829749_052021-O.jpg",
        condition: "new",
        free_shipping: true,
        description: "Graba videos 4K y captura retratos espectaculares y paisajes increíbles...",
    },
    categories: ["Celulares y Teléfonos", "Celulares y Smartphones"],
};

describe('ProductDetail Component', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        json: jest.fn().mockResolvedValue({
                            item: mockData.item,
                            categories: mockData.categories,
                        }),
                    });
                }, 1000); // Introduce un retraso de 100 ms para simular la carga
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('displays product details after loading', async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/items/MLA1906911298']}>
                    <Routes>
                        <Route path="/items/:id" element={<ProductDetail />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Verifica que el componente de carga (spinner) esté presente inicialmente
        expect(screen.getByRole('status', { name: "Loading" })).toBeInTheDocument();

        // Espera a que los detalles del producto se muestren después de la carga
        await waitFor(() => {
            expect(screen.getByText('Apple iPhone 11 (128 Gb) - Negro')).toBeInTheDocument();
            expect(screen.getByText('ARS 1027000')).toBeInTheDocument();
            expect(screen.getByText('Graba videos 4K y captura retratos espectaculares y paisajes increíbles...')).toBeInTheDocument();
        });

        // Verifica que el spinner de carga ya no esté en el documento después de cargar los datos
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
});
