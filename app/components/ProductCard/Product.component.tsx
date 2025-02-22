import { ProductInterface } from '@/app/types/product.type'
import Image from 'next/image'
import React, { useState } from 'react'
import Rating from '../Rating/Rating.component';
import { IoBagAddOutline } from "react-icons/io5";
import styles from './style.module.scss'

interface ProductComponentPropTypes {
  product: ProductInterface;
  onAddToCart: (productId: number) => void;
}

const ProductComponent: React.FC<ProductComponentPropTypes> = ({
  product,
  onAddToCart
}) => {

  const [number, setNumber] = useState<number>(1);

  const handleIncrement = () => {
    setNumber(state => state + 1);
  }

  const handleDecrement = () => {
    if (number > 0) {
      setNumber(state => state - 1);
    }
  }

  return (
    <div className={styles.productContainer}>
      <h3 className={styles.productTitle}>{product.title}</h3>
      <div className={styles.imageContainer}>
        <Image className={styles.productImage} width={180} height={200} src={product.image} alt="product_image" />
      </div>
      <div className={styles.ratingContainer}>
        <Rating rating={product.rating.rate} />
        <span className={styles.rateCount}>{product.rating.rate}</span>
      </div>
      <div className={styles.prpductPriceContainer}>
        <span className={styles.productPrice}>{product.price.toFixed(2)} $</span>
        <button className={styles.addToCartButton} onClick={() => onAddToCart(product.id)}>
          <IoBagAddOutline className={styles.addToCartIcon} />
        </button>
      </div>
    </div>
  )
}

export default ProductComponent