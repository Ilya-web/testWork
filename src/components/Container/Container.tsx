import React from 'react';
import classNames from 'classnames';

import styles from './Container.module.scss';

type TContainer = {
  children: React.ReactNode;
  id?: string;
  containerFluid?: boolean;
};

export const Container: React.FC<TContainer> = ({ children, id, containerFluid }: TContainer) => {
  return (
    <div className={classNames(containerFluid ? styles.containerFluid : styles.container)} id={id}>
      {children}
    </div>
  );
};
