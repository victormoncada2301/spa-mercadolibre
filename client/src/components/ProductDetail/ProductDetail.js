import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.scss';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/api/items/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data.item))
            .catch((error) => console.error('Error al obtener detalles del producto:', error));
    }, [id]);
    
    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <div className="product-header">
                <img src={product.picture} alt={product.title} className="product-image" />
                <div className="product-info">
                    <p className="product-condition">
                        {product.condition === 'new' ? 'Nuevo' : 'Usado'} - {product.sold_quantity} vendidos
                    </p>
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-price">
                        {product.price.currency} {product.price.amount}
                        <span className="price-decimals">{product.price.decimals}</span>
                    </p>
                    <button className="buy-button">Comprar</button>
                </div>
            </div>
            <div className="product-description">
                <h2>Descripción del producto</h2>
                <p>{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
