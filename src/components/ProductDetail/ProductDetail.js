import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`/api/items/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data.item));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <img src={product.picture} alt={product.title} />
            <h1>{product.title}</h1>
            <p>{product.price.currency} {product.price.amount}</p>
            <p>Condition: {product.condition}</p>
            <p>Free Shipping: {product.free_shipping ? 'Yes' : 'No'}</p>
            <p>Sold Quantity: {product.sold_quantity}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductDetail;
