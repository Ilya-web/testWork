import React, { useEffect } from 'react';
import {
  Control,
  Controller,
  UseFormHandleSubmit,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';

import { Button, Input, InputFile, InputsGroup, Title, Container } from 'components';
import { TForm } from 'types/types';

import styles from 'feauture/FormSection/FormSection.module.scss';

type TFormSection = {
  resetField: UseFormResetField<TForm>;
  handleSubmit: UseFormHandleSubmit<TForm>;
  getValues: UseFormSetValue<TForm>;
  control: Control<TForm>;
  setValue: UseFormSetValue<TForm>;
  reset: (values?: Record<string, any>, options?: Record<string, boolean>) => void;
  isSubmitSuccessful: boolean;
  isValid: boolean;
  onSubmit: (data: TForm) => void;
};

export const FormSection: React.FC<TFormSection> = ({
  resetField,
  handleSubmit,
  control,
  setValue,
  reset,
  isSubmitSuccessful,
  isValid,
  onSubmit,
}) => {
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        email: '',
        phone: '',
        photo: '',
        position_id: 1,
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Container id="singUp">
      <div className={styles.formSection}>
        <Title value="Working with POST request" textCenter />
        <div className={styles.formSectionContent}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
                <Input
                  type="text"
                  name={name}
                  label="Your name"
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
                <Input
                  type="text"
                  name={name}
                  label="Email"
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
                <Input
                  mask="+38 (099) 999-99-99"
                  type="tel"
                  name={name}
                  label="Phone"
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                  wrapperClassName={styles.noMB}
                  helperText="+38 (XXX) XXX - XX - XX"
                />
              )}
            />

            <div className={styles.inputGroup}>
              <div className={styles.inputGroupTitle}>Select your position</div>
              <Controller
                control={control}
                name="position_id"
                render={({ field: { onChange, value, name, ref } }) => {
                  return (
                    <InputsGroup
                      setValue={setValue}
                      value={value}
                      inputRef={ref}
                      onChange={onChange}
                      name={name}
                    />
                  );
                }}
              />
            </div>
            <InputFile
              name="photo"
              control={control}
              type="file"
              resetField={resetField}
              isSubmitSuccessful={isSubmitSuccessful}
            />
            <div className={styles.wrapperButton}>
              <Button type="submit" disabled={!isValid}>
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
