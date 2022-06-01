import React, { useCallback, useEffect, useState } from 'react';
import { useController, UseFormResetField, FieldValues, UseControllerProps } from 'react-hook-form';
import classNames from 'classnames';

import { ReactComponent as Close } from 'assets/close.svg';
import styles from './InputFile.module.scss';
import { TForm } from 'types/types';

interface IProps<FormValues> extends UseControllerProps<FormValues> {
  type: string;
  helperText?: string;
  resetField: UseFormResetField<TForm>;
  isSubmitSuccessful: boolean;
}

export const InputFile = <FormValues extends FieldValues>({
  name,
  control,
  rules,
  helperText,
  type,
  resetField,
  isSubmitSuccessful,
}: IProps<FormValues>) => {
  const [value, setValue] = useState('');
  const [fileName, setFileName] = useState('');
  const { field } = useController({ control, name });

  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const clearInput = useCallback(() => {
    resetField('photo');
    setValue('');
    setFileName('');
  }, [resetField, setValue, setFileName]);

  useEffect(() => {
    clearInput();
  }, [isSubmitSuccessful, clearInput]);

  return (
    <div className={styles.inputFileRow}>
      <div
        className={classNames(styles.wrapInputFile, {
          [styles.wrapInputFileError]: error?.message,
        })}
      >
        <label
          className={classNames(styles.inputFileTitle, {
            [styles.inputFileTitleError]: error?.message,
          })}
        >
          <span>Upload</span>
          <input
            type={type}
            value={value}
            onChange={(e) => {
              setFileName(e.target.files ? e.target.files[0].name : '');
              setValue(e.target.value);
              field.onChange(e.target.files);
            }}
          />
        </label>
        <span
          className={classNames(styles.inputFileName, {
            [styles.inputFileActive]: value,
          })}
        >
          {fileName || 'Upload your photo'}
        </span>
        {value && (
          <button type="button" className={styles.inputFileClean} onClick={clearInput}>
            <Close />
          </button>
        )}
      </div>
      {helperText && <div className={styles.helperText}>{helperText}</div>}
      {error?.message && <span className={styles.errorText}>{error?.message}</span>}
    </div>
  );
};
