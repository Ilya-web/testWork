import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

type TButton = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  link?: string;
  type?: 'button' | 'submit' | 'reset';
};
export const Button: React.FC<TButton> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  link = '',
  type = 'button',
}: TButton) => {
  return link ? (
    <a
      href={link}
      className={classNames(styles.btnSite, className, {
        [styles.btnSiteDisabled]: disabled,
      })}
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.btnSite, className, {
        [styles.btnSiteDisabled]: disabled,
      })}
    >
      {children}
    </button>
  );
};
