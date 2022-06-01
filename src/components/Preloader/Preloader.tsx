import React from 'react';

import { ReactComponent as Loader } from 'assets/loader.svg';

import styles from './Preloader.module.scss';

export const Preloader: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <Loader />
    </div>
  );
};
