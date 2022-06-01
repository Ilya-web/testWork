import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header, ModalCustom } from 'components';
import { schema } from 'feauture/FormSection/config';
import { TForm } from 'types/types';
import { MainSection } from '../MainSection';
import { FormSection } from 'feauture/FormSection';
import { Users } from 'feauture/Users';

export const MainPage: React.FC = () => {
  const {
    resetField,
    getValues,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<TForm>({ resolver: yupResolver(schema), mode: 'onChange' });

  const [showModal, setShowModal] = useState(false);
  const [isSuccessForm, setIsSuccessForm] = useState(false);
  const [isMessageForm, setIsMessageForm] = useState('');
  const [isSuccessForModal, setIsSuccessForModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const setSuccessForm = () => {
    setIsSuccessForm(false);
  };

  const onSubmit = (data: TForm) => {
    const replacePhone = data.phone.replace(/[^+\d]/g, '');

    const formData: { [key: string]: string | Blob } = {
      name: data.name,
      email: data.email,
      phone: replacePhone,
      position_id: data.position_id.toString(),
      photo: data.photo[0],
    };

    const formData2 = new FormData();
    for (const name in formData) {
      formData2.append(name, formData[name]);
    }

    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token', {
      method: 'GET',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function ({ token }) {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
          method: 'POST',
          body: formData2,
          headers: { Token: token },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function ({ success, message }) {
            setIsSuccessForm(success);
            setIsMessageForm(message);
            setShowModal(true);
            setIsSuccessForModal(success);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <MainSection />
      <Users isSuccessForm={isSuccessForm} setSuccessForm={setSuccessForm} />
      <FormSection
        resetField={resetField}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        getValues={getValues}
        control={control}
        setValue={setValue}
        reset={reset}
        isValid={isValid}
        isSubmitSuccessful={isSubmitSuccessful}
      />
      <ModalCustom
        modalIsOpen={showModal}
        title={isMessageForm}
        onClose={closeModal}
        success={isSuccessForModal}
      />
    </>
  );
};
