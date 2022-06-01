import React from 'react';

import { Button, Container } from 'components';

import logo from 'assets/logo.svg';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <div className={styles.headerLogo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.headerButtons}>
            <Button link="/#users" className={styles.btnSite}>
              Users
            </Button>
            <Button link="/#singUp" className={styles.btnSite}>
              Sign up
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
