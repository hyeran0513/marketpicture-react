'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "@/components/Loader/Loader";

const ProductListClient = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProductList();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products ? (
        <div>
          {products.map((product) => (
            <div key={product.productId}>
              <h2>{product.productName}</h2>
              <p>가격: {product.price}원</p>
              <p>설명: {product.description}</p>
              <p>카테고리: {product.category}</p>
              <p>재고 수량: {product.stockQuantity}</p>
              <p>생성일: {product.createdDate}</p>
              <p>수정일: {product.modifiedDate}</p>
              <hr />
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