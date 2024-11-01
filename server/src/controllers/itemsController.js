const axios = require('axios');

const author = {
    name: "Victor",
    lastname: "Moncada"
};

// Endpoint de categorias 
const getCategoryPath = async (categoryId) => {
    try {
        const response = await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`);
        return response.data.path_from_root.map(cat => cat.name);
    } catch (error) {
        console.error('Error al obtener la ruta de la categoría:', error);
        return [];
    }
};

// Endpoint de búsqueda
const searchItems = async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
        const items = response.data.results.slice(0, 4).map(item => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: (item.price % 1).toFixed(2).split('.')[1]
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        }));

        // Buscar la categoría con más resultados en `available_filters`
        const categoryFilter = response.data.available_filters.find(filter => filter.id === 'category');
        let categories = [];
        if (categoryFilter && categoryFilter.values.length > 0) {
            const topCategory = categoryFilter.values.sort((a, b) => b.results - a.results)[0];
            categories = await getCategoryPath(topCategory.id);  // Usamos la función aquí
        }

        res.json({ author, categories, items });
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar productos' });
    }
};

// Endpoint de detalle del producto
const getItemDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const [itemResponse, descriptionResponse] = await Promise.all([
            axios.get(`https://api.mercadolibre.com/items/${id}`),
            axios.get(`https://api.mercadolibre.com/items/${id}/description`)
        ]);

        const item = itemResponse.data;
        const description = descriptionResponse.data.plain_text;

        //Obtener las categorias del item
        const categories = item.category_id ? await getCategoryPath(item.category_id) : [];

        const formattedItem = {
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: (item.price % 1).toFixed(2).split('.')[1]
            },
            picture: item.pictures[0].url,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            sold_quantity: item.sold_quantity,
            description: description
        };

        res.json({ author, item: formattedItem, categories });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener detalle del producto' });
    }
};

module.exports = {
    searchItems,
    getItemDetail
};
