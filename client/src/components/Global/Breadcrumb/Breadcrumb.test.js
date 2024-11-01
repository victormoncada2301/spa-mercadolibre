import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb Component', () => {
    it('renders breadcrumb categories correctly', () => {
        const categories = ['Electrónica', 'Celulares', 'Smartphones'];
        
        render(<Breadcrumb categories={categories} />);

        // Verificar que cada categoría esté presente en el breadcrumb
        categories.forEach((category, index) => {
            const breadcrumbItem = screen.getByText(new RegExp(`^${category}`, 'i'));
            expect(breadcrumbItem).toBeInTheDocument();
        });

        // Verificar que el símbolo '>' aparece entre las categorías
        const breadcrumbItems = screen.getAllByText('>', { exact: false });
        expect(breadcrumbItems.length).toBe(categories.length - 1);
    });

    it('renders an empty breadcrumb when no categories are provided', () => {
        render(<Breadcrumb categories={[]} />);
        
        const breadcrumbNav = screen.getByRole('navigation');
        expect(breadcrumbNav).toBeInTheDocument();
        expect(breadcrumbNav).toBeEmptyDOMElement();
    });
});
