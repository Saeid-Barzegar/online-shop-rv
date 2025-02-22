import React from 'react'
import { IoAlertCircle } from "react-icons/io5";
import LinkButton from '../LinkButton/LinkButton.component';
import styles from './style.module.scss'

const ErrorComponent: React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <IoAlertCircle className={styles.alertIcon} />
      <h2 className={styles.errorTitle}>Something went wrong!</h2>
      <p className={styles.errorMessage}>Please contact support team.</p>
      <LinkButton path='/'>Back</LinkButton>
    </div>
  )
}

export default ErrorComponent;
