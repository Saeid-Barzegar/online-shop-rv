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
  // pages data beind stored in this state
  const [productsToShow, setProductsToShow] = useState<ProductInterface[]>([]);
  // pagination data
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  });
  // handle fetch product list from API
  const { data = [], isLoading, error } = useQuery<ProductInterface[]>({
    queryKey: ["productList"],
    queryFn: getProductList,
  });

  // handle change page number
  const handleChangePage = (page: number) => {
    setPaginationData(state => ({
      ...state,
      currentPage: page,
    }))
  };

  // sidebar onClose event
  const sidebarCloseHandler = () => {
    dispatch(toggleSideBar(false))
  }

  // recalculate the total page numbers ahen data changed
  useEffect(() => {
    if (!isEmpty(data)) {
      setPaginationData({
        ...paginationData,
        totalPages: Math.ceil(data.length / paginationData.itemsPerPage)
      });
    }
  }, [data]);

  // recalculate page related data when current page and data have changed
  useEffect(() => {
    if (!isEmpty(data)) {
      const start = (paginationData.currentPage - 1) * paginationData.itemsPerPage;
      const end = start + paginationData.itemsPerPage;
      setProductsToShow(data.slice(start, end));
    }
  }, [data, paginationData.currentPage])

  // Display error page when error occoured while calling API 
  if (error) return <ErrorComponent />
  // Display loading when API being called
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
        onClose={sidebarCloseHandler}
        title="Shopping Cart"
      />
    </>
  );
}
