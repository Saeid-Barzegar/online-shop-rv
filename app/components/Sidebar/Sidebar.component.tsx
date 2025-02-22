"use client"

import React, { useState } from 'react'
import styles from "./styles.module.scss";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CartItemType, ProductInterface } from '@/app/types/product.type';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { removeFromCart } from '@/app/store/slices/shopSlice';
import { toggleModal } from '@/app/store/slices/commonSlice';
import Modal from '../Modal/Modal.component';

interface SidebarPropTypes {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarPropTypes> = ({
  isOpen = true,
  title,
  onClose
}) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [setSelectedToRemove, setSetSelectedToRemove] = useState<number>(-1)
  const { cart } = useSelector((state: RootState) => state.shop);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, cartItem) => {
    const { product, count } = cartItem;
    return total + (product.price * count);
  }, 0);

  const removeButtonClickHandler = (productId: number) => {
    setSetSelectedToRemove(productId);
    setIsModalOpen(true);
  }

  const removeRowHandler = () => {
    dispatch(removeFromCart(setSelectedToRemove));
  }

  return isOpen && (
    <div className={styles.sidebar}>
      <div className={styles.headerContainer}>
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          <IoClose className={styles.closeIcon} />
        </button>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <table className={styles.cartTable} cellSpacing={0}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Count</th>
            <th>Total Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isEmpty(cart)
            ? <h2>Your Cart is Empty</h2>
            : cart.map((cartItem: CartItemType) => {
              const { count, product } = cartItem;
              return (
                <tr key={product.id}>
                  <td style={{ display: 'flex', flexDirection: 'column' }}>
                    <Image className={styles.productImage} src={product.image} alt={"product_image"} width={50} height={50} />
                    <span>{product.title}</span>
                  </td>
                  <td>{count}</td>
                  <td>{(product.price * count).toFixed(2)}</td>
                  <td>
                    <button className={styles.removeButton} onClick={() => removeButtonClickHandler(product.id)}>
                      <IoClose className={styles.removeIcon} />
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
        <tfoot>
          <tr className={styles.tableRow}>
            <td colSpan={2}>Total Amount</td>
            <td colSpan={2} style={{ textAlign: 'right' }}>{totalPrice.toFixed(2)} $</td>
          </tr>
        </tfoot>
      </table>
      <Modal
        isOpen={isModalOpen}
        title='Remove Product'
        onClose={() => dispatch(toggleModal(false))}
      >
        <div>
          <h2>Are you sure you want to remove this product from cart?</h2>
          <div className={styles.bottonContainer}>
            <button onClick={removeRowHandler}>Yes</button>
            <button onClick={() => setIsModalOpen(false)}>No</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Sidebar