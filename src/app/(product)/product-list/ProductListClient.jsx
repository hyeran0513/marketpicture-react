'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "@/components/Loader/Loader";
import styles from "./ProductList.module.scss";
import { useRouter } from 'next/navigation';

const ProductListClient = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`/api/v1/product/all`);
      setProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProductList();
  }, []);

  const addComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.page}>
      {products ? (
        <div className={styles.list}>
          {products.map((product) => (
            <div 
              key={product.productId} 
              className={styles.listItem}
              onClick={() => router.push(`/product-details/${product.productId}`)}
            >
              <div className={styles.thumbnail}>
                <div className={styles.thumbnailDefault} />
              </div>

              <h3 className={styles.title}>{product.productName}</h3>
              
              <div className={styles.description}>{product.description}</div>
              
              <div className={styles.price}>
                <span className={styles.priceValue}>{addComma(product.price)}</span>
                <span className={styles.priceUnit}>원</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>상품이 없습니다.</div>
      )}
    </div>
  );
};

export default ProductListClient;