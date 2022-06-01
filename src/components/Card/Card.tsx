import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import { TUser } from 'types/types';
import userImg from 'assets/photo-user-default.svg';
import styles from './Card.module.scss';

type TProps = {
  cardInfo: TUser;
  className?: string;
};

export const Card: React.FC<TProps> = ({ cardInfo, className = '' }: TProps) => {
  const { photo, name, position, email, phone } = cardInfo;

  const [imageUrl, setImageUrl] = useState(userImg);
  const resetServiceImageUrl = useCallback(() => setImageUrl(userImg), []);

  useEffect(() => {
    setImageUrl(photo || userImg);
  }, [photo]);

  return (
    <div className={classNames(className)}>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={imageUrl} onError={resetServiceImageUrl} alt="user photo" />
        </div>
        <div className={styles.cardName}>{name}</div>
        <div className={styles.cardPosition}>{position}</div>
        <div className={styles.cardEmail}>
          <a href={`mailto:${email}`} title={email}>
            {email}
          </a>
        </div>
        <div className={styles.cardPhone}>
          <a href={`tel:${phone}`} title={phone}>
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
};
