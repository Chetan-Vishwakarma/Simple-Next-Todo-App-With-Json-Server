// ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  // Dummy product data for demonstration
  const product = {
    id: parseInt(id),
    name: `Product ${id}`,
    description: `This is the description for Product ${id}.`,
  };

  return (
    <div>
      <h2>Product Details</h2>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;

