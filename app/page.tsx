"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductInterface } from "./types/product.type";
import { getProductList } from "./utilities/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { toggleSideBar } from "./store/slices/commonSlice";
import ProductComponent from "./components/ProductCard/Product.component";
import Sidebar from "./components/Sidebar/Sidebar.component";
import Pagination from "./components/Pagination/Pagination.component";
import Loading from "./components/Loading/Loading.component";
import ErrorComponent from "./components/Error/Error.component";
import styles from "./page.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector((state: RootState) => state.common);

  // Pagination state
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  // Fetch product list
  const { data = [], isLoading, error } = useQuery<ProductInterface[]>({
    queryKey: ["productList"],
    queryFn: getProductList,
  });

  // Calculate total pages dynamically
  const totalPages = Math.ceil(data.length / paginationData.itemsPerPage);

  // Slice products for current page
  const start = (paginationData.currentPage - 1) * paginationData.itemsPerPage;
  const end = start + paginationData.itemsPerPage;
  const productsToShow = data.slice(start, end);

  // Handle page change
  const handleChangePage = (page: number) =>
    setPaginationData((state) => ({ ...state, currentPage: page }));

  if (error) return <ErrorComponent />;
  if (isLoading) return <Loading isLoading />;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productsContainer}>
          {productsToShow.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={totalPages}
            onPageChange={handleChangePage}
          />
        </div>
      </div>
      <Sidebar
        isOpen={isOpenSidebar}
        title="Shopping Cart"
        onClose={() => dispatch(toggleSideBar(false))}
      />
    </>
  );
};
