import React, { useCallback, useEffect, useState } from 'react';

import { TUser } from 'types/types';
import { Button, Preloader, Card, Title, Container } from 'components';

import styles from './Users.module.scss';

type TUsers = {
  isSuccessForm: boolean;
  setSuccessForm: () => void;
};

export const Users: React.FC<TUsers> = ({ isSuccessForm, setSuccessForm }: TUsers) => {
  const [usersArray, setUsersArray] = useState<TUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleButton, setVisibleButton] = useState(true);
  const [visibleLoader, setVisibleLoader] = useState(false);

  const getUsers = useCallback(() => {
    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=6`,
    )
      .then(function (response) {
        return response.json();
      })
      .then(function ({ users, total_pages, success }) {
        const sortUsers = users.sort(
          (a: TUser, b: TUser) => b.registration_timestamp - a.registration_timestamp,
        );
        if (currentPage > 1) {
          setUsersArray((prevState) => {
            return [...prevState, ...sortUsers];
          });
        } else {
          setUsersArray(sortUsers);
        }
        setVisibleLoader(false);
        setVisibleButton(!(total_pages === currentPage));
        if (success) {
        } else {
        }
      });
  }, [currentPage]);

  useEffect(() => {
    if (isSuccessForm) {
      setUsersArray([]);
      if (currentPage === 1) {
        getUsers();
      } else {
        setCurrentPage(1);
      }
      setSuccessForm();
    }
  }, [isSuccessForm, currentPage, getUsers, setSuccessForm]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const nextPage = () => {
    setVisibleLoader(true);
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <Container id="users">
      <div className={styles.users}>
        <Title value="Working with GET request" textCenter />
        <div className={styles.usersItems}>
          {usersArray &&
            usersArray.map((item) => {
              return <Card cardInfo={item} className={styles.usersItem} key={item.id} />;
            })}
        </div>
        {visibleLoader && <Preloader />}
        <div className={styles.usersButton}>
          {visibleButton && <Button onClick={nextPage}>Show more</Button>}
        </div>
      </div>
    </Container>
  );
};
