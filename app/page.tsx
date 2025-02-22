"use client"

import { useQuery } from "@tanstack/react-query";
import { ProductInterface } from "./types/product.type";
import { getProductList } from "./utilities/products";
import ShopScreen from "./screens/Shop.screen";
import styles from "./page.module.scss"
import Navigation from "./components/Navigation/Navigation.component";
import ProductComponent from "./components/ProductCard/Product.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { addToCart } from "./store/slices/shopSlice";
import Modal from "./components/Modal/Modal.component";
import Sidebar from "./components/Sidebar/Sidebar.component";
import { toggleSideBar } from "./store/slices/commonSlice";


export default function Home() {

  const { isOpenSidebar } = useSelector((state: RootState) => state.common)
  const dispatch = useDispatch()

  const { data = [], isLoading, error } = useQuery<ProductInterface[]>({
    queryKey: ["productList"],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 1, // Override default staleTime (1 min)
  });

  console.log({ data, isLoading, error })

  if (error) return <h1>Oops! something went wrong!</h1>
  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flex: 1,
          padding: '2rem',
          flexWrap: 'wrap',
        }}>
          {data.map((product: ProductInterface) => (
            <ProductComponent
              key={product.id}
              product={product}
              onAddToCart={() => {
                dispatch(addToCart({ product, count: 1 }))
              }}
            />
          ))
          }
        </div>
        {/* <Modal isOpen={true} onClose={() => { }} >
          <div>
            <h1>Modal Content</h1>
            <p>This is a modal content</p>
          </div>
        </Modal> */}

      </div >
      <Sidebar
        isOpen={isOpenSidebar}
        onClose={() => {
          dispatch(toggleSideBar(false))
        }}
        title="Shopping Cart"
      />
    </>
  );
}
