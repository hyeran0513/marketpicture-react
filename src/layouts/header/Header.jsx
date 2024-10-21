import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <ul className={styles.gnb}>
          <li className={styles.gnbMenu}>
            <Link
              href={"/"}
            >
              홈
            </Link>
          </li>

          <li className={styles.gnbMenu}>
            <Link
              href={"/product-list"}
            >
              상품 목록
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header