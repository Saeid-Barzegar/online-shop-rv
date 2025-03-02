import React, { useEffect } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { AlertPropTypes } from '@/app/types/components.type';
import { TIMER_VALUE, BACKGROUND_COLOR_MAPPER, TEXT_COLOR_MAPPER } from "./constants"
import styles from "./style.module.scss";

const Alert: React.FC<AlertPropTypes> = ({
  mode = "info",
  message = "",
  onClose
}) => {

  useEffect(() => {
    if (!message) return;
    const alertTimeout = setTimeout(() => onClose(), TIMER_VALUE);
    return () => clearTimeout(alertTimeout);
  }, [message]);

  return (
    <div className={`${styles.container} ${BACKGROUND_COLOR_MAPPER[mode]}`}>
      <button
        onClick={onClose}
        className={styles.closeButton}
      >
        <IoCloseOutline
          className={`${styles.closeIcon} ${TEXT_COLOR_MAPPER[mode]}`}
        />
      </button>
      <span className={`${styles.message} ${TEXT_COLOR_MAPPER[mode]}`}>{message}</span>
    </div>
  )
}

export default Alert