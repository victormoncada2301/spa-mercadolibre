const axios = require('axios');

const author = {
    name: "Victor",
    lastname: "Moncada"
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
        const categories = response.data.filters.find(filter => filter.id === 'category')?.values[0].path_from_root.map(cat => cat.name) || [];

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

        res.json({ author, item: formattedItem });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener detalle del producto' });
    }
};

module.exports = {
    searchItems,
    getItemDetail
};
