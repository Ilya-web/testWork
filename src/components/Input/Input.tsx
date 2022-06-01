import React, { ChangeEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';

import styles from './Input.module.scss';

type TInput = {
  name: string;
  label: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  className?: string;
  type: 'text' | 'email' | 'tel';
  mask?: string;
  value: string;
  inputRef: React.Ref<HTMLInputElement>;
  helperText?: string;
  wrapperClassName?: string;
};

export const Input: React.FC<TInput> = ({
  name,
  label,
  onChange,
  onFocus,
  onBlur,
  error,
  type,
  mask,
  value,
  inputRef,
  helperText,
  className,
  wrapperClassName,
}: TInput) => {
  const [isActiveInput, setIsActiveInput] = useState(false);

  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
    if (!value) {
      setIsActiveInput(false);
    }
  }, [value, onBlur]);

  const focusInput = () => {
    if (onFocus) onFocus();
    setIsActiveInput(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    if (value) {
      setIsActiveInput(true);
    }
  };

  return (
    <div className={classNames(styles.rowInput, wrapperClassName)}>
      <div className={styles.wrapInput}>
        <label
          htmlFor={name}
          className={classNames(styles.label, {
            [styles.labelActive]: isActiveInput,
            [styles.labelError]: error,
          })}
        >
          {label}
        </label>
        {mask ? (
          <InputMask
            type={type}
            className={classNames(styles.inputSite, className, {
              [styles.inputError]: error,
            })}
            onFocus={focusInput}
            onChange={handleChange}
            onBlur={handleBlur}
            mask={mask}
            value={value}
          >
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (inputProps) => <input ref={inputRef} {...inputProps} type={type} />
            }
          </InputMask>
        ) : (
          <input
            type={type}
            className={classNames(styles.inputSite, className, {
              [styles.inputError]: error,
            })}
            onFocus={focusInput}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            ref={inputRef}
          />
        )}
      </div>
      {helperText && <div className={styles.helperText}>{helperText}</div>}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
