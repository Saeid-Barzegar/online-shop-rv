"use client"

import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { useQuery } from "@tanstack/react-query";
import { ProductInterface } from "./types/product.type";
import { getProductList } from "./utilities/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { toggleSideBar } from "./store/slices/commonSlice";
import ProductComponent from "./components/ProductCard/Product.component";
import Navigation from "./components/Navigation/Navigation.component";
import Sidebar from "./components/Sidebar/Sidebar.component";
import Pagination from "./components/Pagination/Pagination.component";
import Loading from "./components/Loading/Loading.component";
import ErrorComponent from "./components/Error/Error.component";
import styles from "./page.module.scss"


export default function Home() {

  const dispatch = useDispatch()
  const { isOpenSidebar } = useSelector((state: RootState) => state.common);
  const [productsToShow, setProductsToShow] = useState<ProductInterface[]>([])
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  });

  const { data = [], isLoading, error } = useQuery<ProductInterface[]>({
    queryKey: ["productList"],
    queryFn: getProductList,
  });

  const handleChangePage = (page: number) => {
    setPaginationData(state => ({
      ...state,
      currentPage: page,
    }))
  }

  useEffect(() => {
    if (!isEmpty(data)) {
      setPaginationData({
        ...paginationData,
        totalPages: Math.ceil(data.length / paginationData.itemsPerPage)
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data)) {
      const start = (paginationData.currentPage - 1) * paginationData.itemsPerPage;
      const end = start + paginationData.itemsPerPage;
      setProductsToShow(data.slice(start, end));
    }
  }, [data, paginationData.currentPage])

  if (error) return <ErrorComponent />
  if (isLoading) return <Loading isLoading />

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.productsContainer} >
          {productsToShow.map((product: ProductInterface) => (
            <ProductComponent
              key={product.id}
              product={product}
            />
          ))
          }
        </div>
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={(page: number) => handleChangePage(page)}
          />
        </div>
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
