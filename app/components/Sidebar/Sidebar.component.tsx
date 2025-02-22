"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CartItemType } from '@/app/types/product.type';
import { removeFromCart } from '@/app/store/slices/shopSlice';
import { SidebarPropTypes } from '@/app/types/components.type';
import Modal from '../Modal/Modal.component';
import Button from '../Button/Button.component';
import { toggleModal } from '@/app/store/slices/commonSlice';
import { IoClose, IoBagOutline } from "react-icons/io5";
import styles from "./styles.module.scss";

const Sidebar: React.FC<SidebarPropTypes> = ({
  isOpen = true,
  title,
  onClose
}) => {

  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.shop);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [setSelectedToRemove, setSetSelectedToRemove] = useState<number>(-1)

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
    setIsModalOpen(false);
  }

  const renderCartTable = () => {
    return (
      <table className={styles.cartTable} cellSpacing={0}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Count</th>
            <th colSpan={2}>Item Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem: CartItemType) => {
            const { count, product } = cartItem;
            const itemPrice = (product.price * count).toFixed(2)
            return (
              <tr key={product.id}>
                <td style={{ display: 'flex', flexDirection: 'column' }}>
                  <Image className={styles.productImage} src={product.image} alt={"product_image"} width={50} height={50} />
                  <span>{product.title}</span>
                </td>
                <td>{count}</td>
                <td>{itemPrice}</td>
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
    )
  };

  const renderCardIsEmpty = () => (
    <div className={styles.emptyCartContainer}>
      <IoBagOutline className={styles.emptyCartImage} />
      <h3 className={styles.emptyCartTitle}>Your Cart is Empty</h3>
      <Button onClick={onClose}>
        <span>Continue Shopping</span>
      </Button>
    </div>
  )

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
      {isEmpty(cart)
        ? renderCardIsEmpty()
        : renderCartTable()
      }

      <Modal
        isOpen={isModalOpen}
        title='Remove Product'
        onClose={() => dispatch(toggleModal(false))}
      >
        <div className={styles.modalContentContainer}>
          <p className={styles.modalContentMessage}>Are you sure you want to remove this product from cart?</p>
          <div className={styles.bottonContainer}>
            <Button onClick={removeRowHandler}>
              <span>Yes</span>
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              <span>No</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Sidebar