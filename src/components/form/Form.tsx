import { SubmitHandler, useForm } from 'react-hook-form';

import { FC } from 'react';

import { Input } from '..';
import { useAppDispatch } from '../../app/hooks';
import { fetchJoinUser } from '../../features/join/joinAsyncThunks';

export interface FormFields {
  name?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
}

interface FormProps {
  type?: string;
}

export const Form: FC<FormProps> = ({ type }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<FormFields>({
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    dispatch(fetchJoinUser(data));

    reset();
  };

  return (
    <>
      <div
        className={`
        mt-[80px]
        hyphens-manual
        px-14
        pb-8
        text-center
      text-white`}
      >
        {type === 'textMe' ? (
          <div className='text-xxl font-bold leading-8'>
            <p>Get a link as</p>
            <p>soon as it&apos;s ready!</p>
          </div>
        ) : (
          <p>
            Join DoSpace for the latest updates, tips, and to request new
            features!
          </p>
        )}
      </div>

      <form
        className={`
        flex 
        w-screen 
        flex-col 
        ${type === 'textMe' && `px-14`}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {type === 'textMe' ? (
          <Input
            type='tel'
            label='Phone Number'
            name='phoneNumber'
            errors={errors}
            dirtyFields={dirtyFields}
            register={register}
            validationSchema={{
              required: 'Number is required',
              pattern: {
                value: /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                message: 'Entered value does not match phone number format',
              },
            }}
          />
        ) : (
          <div className='px-14'>
            <Input
              label='Name'
              name='name'
              errors={errors}
              dirtyFields={dirtyFields}
              register={register}
              validationSchema={{
                required: 'Name is required',
              }}
            />
            <Input
              label='Email'
              name='email'
              errors={errors}
              dirtyFields={dirtyFields}
              register={register}
              validationSchema={{
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              }}
            />
          </div>
        )}
        <button
          type='submit'
          className='
          flex
          w-[120px]
          cursor-pointer
          justify-center
          self-center
          rounded-[50px]
          bg-light-green
          p-2
          text-[22px]
          font-bold
          text-white
          transition-colors
          duration-150
          active:bg-[#00140A]'
        >
          {type === 'textMe' ? 'Submit' : 'Join'}
        </button>
      </form>
    </>
  );
};
