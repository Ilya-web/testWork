import React from 'react';

import styles from './InputRadio.module.scss';

type TInputRadio = {
  label: string;
  name: string;
  value: number;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.Ref<HTMLInputElement>;
};

export const InputRadio: React.FC<TInputRadio> = ({
  label,
  name,
  inputRef,
  onChange,
  checked,
  value,
}: TInputRadio) => {
  return (
    <label className={styles.wrapperInput}>
      <input
        type="radio"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
      <span className={styles.inputIcon}></span>
      <span>{label}</span>
    </label>
  );
};
