import React from 'react';

import { Button, Title, Container } from 'components';

import styles from './MainSection.module.scss';

export const MainSection: React.FC = () => {
  return (
    <Container containerFluid>
      <div className={styles.mainSection}>
        <div className={styles.mainSectionContent}>
          <Title value="Test assignment for front-end developer" IsH1 className={styles.mb} />
          <p className={styles.mainSectionDesc}>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>
          <Button link="/#singUp">Sign up</Button>
        </div>
      </div>
    </Container>
  );
};
