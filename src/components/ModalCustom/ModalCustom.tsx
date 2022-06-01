import React from 'react';
import Modal from 'react-modal';

import { ReactComponent as Close } from 'assets/close.svg';
import { ReactComponent as SuccessImage } from 'assets/success-image.svg';
import { ReactComponent as ErrorImage } from 'assets/errorImg.svg';

import styles from './ModalCustom.module.scss';
import { Title } from 'components';

type TModalCustom = {
  modalIsOpen: boolean;
  success: boolean;
  title: string;
  onClose: () => void;
};

export const ModalCustom: React.FC<TModalCustom> = ({
  modalIsOpen = false,
  success,
  title,
  onClose,
}: TModalCustom) => (
  <div>
    <Modal isOpen={modalIsOpen} ariaHideApp={false}>
      <Title value={title} textCenter />
      <div className={styles.descModal}>{success ? <SuccessImage /> : <ErrorImage />}</div>
      <button onClick={onClose} className={styles.closeModal}>
        <Close />
      </button>
    </Modal>
  </div>
);
