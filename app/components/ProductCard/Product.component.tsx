"use client"

import React from 'react'
import Image from 'next/image'
import { ProductComponentPropTypes } from '@/app/types/components.type'
import Rating from '../Rating/Rating.component';
import Link from 'next/link';
import styles from './style.module.scss'

const ProductComponent: React.FC<ProductComponentPropTypes> = ({
  product,
}) => {

  return (
    <Link href={`/product/${product.id}`}>
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
        </div>
      </div>
    </Link>
  )
}

export default ProductComponent