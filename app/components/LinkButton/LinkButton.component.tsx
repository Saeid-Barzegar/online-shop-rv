'use client'

import React from 'react'
import Link from 'next/link';
import { LinkButtonPropTypes } from '@/app/types/components.type';
import styles from "./style.module.scss";

const LinkButton: React.FC<LinkButtonPropTypes> = ({
  path,
  children,
}) => {
  return (
    <Link className={styles.linkButton} href={path}>{children}</Link>
  )
}

export default LinkButton;
