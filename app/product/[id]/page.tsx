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
import { CartItemType, ProductInterface } from "@/app/types/product.type";
import { AlertType } from "@/app/types/components.type";
import { getProductDetails } from "@/app/utilities/products";
import Rating from "@/app/components/Rating/Rating.component";
import AddAmountButton from "@/app/components/AddAmountButton/AddAmountButton.component";
import Button from "@/app/components/Button/Button.component";
import Sidebar from "@/app/components/Sidebar/Sidebar.component";
import Loading from "@/app/components/Loading/Loading.component";
import ErrorComponent from "@/app/components/Error/Error.component";
import Alert from "@/app/components/Alert/Alert.component";
import styles from "./page.module.scss";


const ProductPage: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector((state: RootState) => state.common);
  const { cart } = useSelector((state: RootState) => state.shop);
  const [alert, setAlert] = useState<AlertType>({
    mode: "",
    message: "",
  });
  const productId = Number(params?.id);

  const [count, setCount] = useState<number>(0);

  // fetch product details API
  const { data, isLoading, error } = useQuery<ProductInterface>({
    queryKey: ["productDetails"],
    queryFn: () => getProductDetails(productId),
    enabled: !isNaN(productId),
  });

  // product rating, "No need useMemo in Ract 19"
  const productRate = get(data, 'rating.rate', 0);

  // plus button action for product amount
  const handleIncrement = () => setCount(state => state + 1);

  // minus button action for product amount
  const handleDecrement = () => count > 0 && setCount(state => state - 1);

  const handleAddToCard = () => {
    // shows error message once user didn't change default amount
    if (count === 0) {
      setAlert({
        mode: "warning",
        message: "Please select the amount of product to add to cart",
      });
      return;
    }
    if (data) {
      // checks the product already added to the cart or not
      const isAlreadyAdded = cart.some((item: CartItemType) => item.product.id === productId);
      dispatch(
        isAlreadyAdded
          ? updateItemCount({
            product: data,
            count
          })
          : addToCart({
            product: data,
            count
          })
      )
      //
      setAlert({
        mode: "success",
        message: isAlreadyAdded ? "Product updated in cart, successfully" : "Product added successfully",
      })
      // after saccessful action call count state will be reset
      setCount(0);
    }
  };

  const resetAlert = () => setAlert(prevAlert => ({
    ...prevAlert,
    mode: "",
    message: "",
  }));

  const closeSidebarHandler = () => dispatch(toggleSideBar(false));

  if (error) return <ErrorComponent />
  if (isLoading) return <Loading isLoading />

  return (
    <div className={styles.container}>
      {!isEmpty(alert.message) && !isEmpty(alert.mode)
        && (
          <Alert
            mode={alert.mode}
            message={alert.message}
            onClose={resetAlert}
          />
        )}
      {!isEmpty(data) && (
        <>
          <h3 className={styles.productTitle}>{data.title}</h3>
          <div className={styles.imageContainer}>
            <Image
              layout="fill"
              objectFit="contain"
              src={data.image}
              alt="product_image"
              priority
            />
          </div>
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
        onClose={closeSidebarHandler}
        title="Shopping Cart"
      />
    </div>
  );
};

export default ProductPage;