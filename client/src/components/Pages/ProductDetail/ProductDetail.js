import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Loading from '../Global/Loading/Loading';
import Breadcrumb from '../Global/Breadcrumb/Breadcrumb';
import './ProductDetail.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [categories] = useState(location.state?.categories || []);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/items/${id}`);
                const data = await response.json();
                setProduct(data.item);
            } catch (error) {
                console.error('Error al obtener detalles del producto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <Loading />;

    return (
        <div className="product-detail">
            <Breadcrumb categories={categories} />
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
