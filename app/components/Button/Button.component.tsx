"use client"

import React, { ReactElement } from 'react'
import styles from './style.module.scss'

type ButtonPropTypes = {
  onClick: () => void;
  disabled?: boolean;
  children?: ReactElement
}

const Button: React.FC<ButtonPropTypes> = ({
  onClick,
  disabled = false,
  children
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >{children}</button>
  )
}

export default Button;
