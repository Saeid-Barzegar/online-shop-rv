"use client"
import React, { ReactElement } from 'react'
import styles from './style.module.scss'

type ButtonPropTypes = {
  onClick: () => void;
  disabled?: boolean;
  children?: ReactElement;
  mode?: 'light' | 'dark'
}

const Button: React.FC<ButtonPropTypes> = ({
  onClick,
  disabled = false,
  children,
  mode = 'dark'
}) => {
  return (
    <button
      className={mode === "dark" ? styles.buttonDark : styles.buttonLight}
      onClick={onClick}
      disabled={disabled}
    >{children}</button>
  )
}

export default Button;
