'use client'

import React, { useState } from "react";
import Image from "next/image";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useParams } from "next/navigation";
import { addToCart, updateItemCount } from "@/app/store/slices/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleSideBar } from "@/app/store/slices/commonSlice";
import { useQuery } from "@tanstack/react-query";
import { ProductInterface } from "@/app/types/product.type";
import { getProductDetails } from "@/app/utilities/products";
import Rating from "@/app/components/Rating/Rating.component";
import AddAmountButton from "@/app/components/AddAmountButton/AddAmountButton.component";
import Button from "@/app/components/Button/Button.component";
import Navigation from "@/app/components/Navigation/Navigation.component";
import Sidebar from "@/app/components/Sidebar/Sidebar.component";
import styles from "./page.module.scss"

const ProductPage: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch()
  const { isOpenSidebar } = useSelector((state: RootState) => state.common);
  const { cart } = useSelector((state: RootState) => state.shop);
  const productId = Number(params?.id);

  const [count, setCount] = useState<number>(0);

  const { data, isLoading, error } = useQuery<ProductInterface>({
    queryKey: ["productDetails"],
    queryFn: () => getProductDetails(Number(productId)),
    enabled: !isNaN(productId),
  });

  const productRate = get(data, 'rating.rate', 0);

  const handleIncrement = () => {
    setCount(state => state + 1);
  }
  const handleDecrement = () => {
    if (count > 0) {
      setCount(state => state - 1);
    }
  }

  const handleAddToCard = () => {
    if (count === 0) {
      alert("Please select the amount of product to add to cart")
      return;
    }
    if (data) {
      const isAlreadyAdded = cart.filter((cartItem) => cartItem.product.id === productId).length > 0;
      if (isAlreadyAdded) {
        dispatch(updateItemCount({
          product: data,
          count
        }))
        alert("Cart updated successfully")
      } else {
        dispatch(addToCart({
          product: data,
          count
        }))
        alert("Product added successfully")
      }
      setCount(0);
    }
  }

  if (error) return <h1>Oops! something went wrong!</h1>
  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        {!isEmpty(data) && (
          <>
            <h3 className={styles.productTitle}>{data.title}</h3>
            <Image width={300} height={400} src={data.image} alt="" />
            <p className={styles.productCategory}>
              Category: <span className={styles.categoryLabel}>
                {data.category}
              </span>
            </p>
            <div className={styles.productRateContainer}>
              <Rating rating={productRate} />
              <span className={styles.productRate} >{productRate}</span>
              <span className={styles.productVoutes}>({get(data, 'rating.count', 0)} votes)</span>
            </div>
            <div className={styles.productPriceContainer}>
              <span>Price: </span>
              <span className={styles.productPriceLabel}>{data.price.toFixed(2)} $</span>
              <div style={{ margin: '0 20px' }}>
                <AddAmountButton
                  number={count}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              </div>
              <Button onClick={handleAddToCard} >
                <span>Add</span>
              </Button>
            </div>
            <p className={styles.productDescription}>{data.description}</p>

          </>
        )}

        <Sidebar
          isOpen={isOpenSidebar}
          onClose={() => {
            dispatch(toggleSideBar(false))
          }}
          title="Shopping Cart"
        />
      </div>
    </>
  );
};

export default ProductPage;