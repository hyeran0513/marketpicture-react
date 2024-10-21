'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "@/components/Loader/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Home.module.scss';
import { useRouter } from 'next/navigation';

const HomeClient = () => {
  const [products, setProducts] = useState(null);
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

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.customNextArrow}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.customPrevArrow}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.page}>
      {products ? (
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            {products.map((product) => (
              <div 
                key={product.productId} 
                className={styles.item}
                onClick={() => router.push(`/product-details/${product.productId}`)}
              >
                <div className={styles.thumbnail}>
                  <div className={styles.thumbnailDefault} />
                </div>

                <h3 className={styles.title}>{product.productName}</h3>
                <div className={styles.price}>
                  <span className={styles.priceValue}>{product.price}</span>
                  <span className={styles.priceUnit}>원</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div>상품이 없습니다.</div>
      )}
    </div>
  );
}

export default HomeClient;