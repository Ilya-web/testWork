import * as Yup from 'yup';
import { getImageSize } from 'utils/common';

const phoneRegExp = /^\+[0-9]{2}\s\((\d{3})\)\s\d{3}-\d{2}-\d{2}$/;

const emailRegExp =
  /^(?:[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be at most 60 characters'),
  email: Yup.string().required('Email is required').matches(emailRegExp, 'Email is not valid'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  photo: Yup.mixed()
    .required('You need to provide a file')
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0]?.size <= 1024 * 1024 * 5;
    })
    .test('type', 'Invalid file format', (value) => {
      return value
        ? (value && value[0].type === 'image/jpeg') || value[0].type === 'image/jpg'
        : false;
    })
    .test('fileSize', 'The file is too small', (value) => {
      return (
        value &&
        getImageSize(value).then(([w, h]: any) => {
          if (w < 70) return false;
          return h >= 70;
        })
      );
    }),
});
