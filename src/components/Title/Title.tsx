import React from 'react';

import styles from './Title.module.scss';
import classNames from 'classnames';

type TTitle = {
  value: string;
  IsH1?: boolean;
  textCenter?: boolean;
  className?: string;
};
export const Title: React.FC<TTitle> = ({ value, IsH1, textCenter, className }: TTitle) => {
  return (
    <>
      {IsH1 ? (
        <h1 className={classNames(styles.h1, textCenter && styles.textCenter, className)}>
          {value}
        </h1>
      ) : (
        <h2 className={classNames(styles.h1, textCenter && styles.textCenter, className)}>
          {value}
        </h2>
      )}
    </>
  );
};
