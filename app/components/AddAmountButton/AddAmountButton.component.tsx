"use client"

import React from 'react'
import styles from "./style.module.scss";

interface AddAmountButtonProps {
  number: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const AddAmountButton: React.FC<AddAmountButtonProps> = ({
  number,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className={styles.addButtonContainer}>
      <button
        className={styles.decrementButton}
        onClick={onDecrement}>-</button>
      <div
        className={styles.amountOfProduct}
      >{number}</div>
      <button
        className={styles.incrementButton}
        onClick={onIncrement}
      >+</button>
    </div>
  )
}

export default AddAmountButton