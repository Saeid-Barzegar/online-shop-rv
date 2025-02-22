import React, { ReactElement } from 'react'
import { IoClose } from "react-icons/io5";
import styles from "./style.module.scss"

type ModalPropTypes = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactElement;
}

const Modal: React.FC<ModalPropTypes> = ({
  isOpen = true,
  title,
  onClose,
  children
}) => {
  return isOpen && (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer} >
        <div className={styles.modalHeader} >
          <h3 className={styles.modalTitle}>{title}</h3>
          <button onClick={onClose} className={styles.modalCloseButton} >
            <IoClose className={styles.modalCloseIcon} />
          </button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal