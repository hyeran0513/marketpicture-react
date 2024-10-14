'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import styles from "./ProductDetails.module.scss";
import Loader from "@/components/Loader/Loader";

const ProductDetailsClient = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`/api/v1/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.product}>
      {product ? (
        <div>
          <p>{product.productName}</p>
          <p>Price: ${product.price}</p>
          <p>설명: ${product.description}</p>
        </div>
      ) : (
        <div>상품이 없습니다.</div>
      )}
    </div>
  );
};

export default ProductDetailsClient;
