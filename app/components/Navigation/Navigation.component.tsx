import Link from 'next/link'
import React, { useReducer } from 'react'
import { IoBagCheckOutline } from "react-icons/io5";
import styles from "./styles.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { toggleSideBar } from '@/app/store/slices/commonSlice';

type Props = {}

const Navigation = (props: Props) => {
  const dispatch = useDispatch()
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.menuContainer}>
        <li className={styles.menuItem}>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <div className={styles.cartContainer}>
        <button onClick={() => dispatch(toggleSideBar(true))} className={styles.cartBotton} >
          <IoBagCheckOutline className={styles.cartIcon} />
        </button>
      </div>
    </nav>
  )
}

export default Navigation