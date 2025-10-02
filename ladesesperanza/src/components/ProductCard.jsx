// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ name, description, image }) => {
    return (
        <article className="product-card">
            {/* Nota: Las rutas de las imágenes deben ser accesibles por React (usualmente desde 'public' o importadas) */}
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
        </article>
    );
};

export default ProductCard;