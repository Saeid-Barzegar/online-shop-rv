import React from 'react'
import Link from 'next/link'
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { toggleSideBar } from '@/app/store/slices/commonSlice';
import { NAVIGATION_ITEMS } from '../constants/navItems';
import { NavigationPropTypes } from '@/app/types/product.type';
import styles from "./styles.module.scss"

const Navigation: React.FC<NavigationPropTypes> = () => {
  const dispatch = useDispatch();

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.menuContainer}>
        {NAVIGATION_ITEMS.map(nav => (
          <Link key={nav.id} href={nav.path}>
            <li className={styles.menuItem}>{nav.label}</li>
          </Link>
        ))}
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