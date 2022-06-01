import React, { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { TForm, TPosition, TPositionsResponse } from 'types/types';
import { InputRadio } from '../InputRadio';

type TInputsGroup = {
  value: string | number;
  inputRef: React.Ref<HTMLInputElement>;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: UseFormSetValue<TForm>;
};

export const InputsGroup: React.FC<TInputsGroup> = ({
  value,
  inputRef,
  onChange,
  name,
  setValue,
}: TInputsGroup) => {
  const [vacancies, setVacancies] = useState<TPosition[]>([]);

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(function (response) {
        return response.json();
      })
      .then(function ({ positions, success }: TPositionsResponse) {
        return success && positions && setVacancies(positions);
      });
  }, []);

  useEffect(() => {
    if (vacancies.length) {
      setValue('position_id', vacancies[0].id);
    }
  }, [vacancies, setValue]);

  return (
    <>
      {vacancies.map(({ id, name: positionName }) => {
        return (
          <InputRadio
            key={id}
            name={name}
            label={positionName}
            value={id}
            checked={id === Number(value)}
            inputRef={inputRef}
            onChange={onChange}
          />
        );
      })}
    </>
  );
};
