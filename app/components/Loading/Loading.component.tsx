'use client'

import React from 'react';
import { LoadingPropTypes } from '@/app/types/components.type';
import styles from './style.module.scss';


const Loading: React.FC<LoadingPropTypes> = ({
  isLoading = false,
}) => {
  return isLoading && (
    <div className={styles.loaderContainer}>
      <span className={styles.loader} />
    </div>
  )
}

export default Loading;