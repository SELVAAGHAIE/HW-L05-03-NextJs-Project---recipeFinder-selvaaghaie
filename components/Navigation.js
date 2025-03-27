
'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={isOpen ? styles.active : ''}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/favorites">Favorites</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

