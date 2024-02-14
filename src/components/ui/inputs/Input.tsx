import { FC } from 'react';

import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { FormFields } from '../../form/Form';

interface InputProps {
  label: string;
  name: keyof FormFields;
  type?: string;
  required?: boolean;
  errors: FieldErrors;
  dirtyFields: Record<string, boolean>;
  validationSchema: RegisterOptions<FormFields, keyof FormFields> | undefined;
  register: UseFormRegister<FormFields>;
}

export const Input: FC<InputProps> = ({
  name,
  label,
  type = 'text',
  required = true,
  errors,
  dirtyFields,
  register,
  validationSchema,
}) => {
  const isDirty = dirtyFields[name];

  return (
    <div className='mb-14 flex border-b border-white '>
      <label
        htmlFor={name}
        className={`
        absolute
        flex
        w-[70%]
        items-center 
        justify-center 
        text-[18px] 
        italic
        text-white
        ${isDirty ? 'hidden' : ''}
       `}
      >
        {required} <p className='text-[#59D07F]'>*</p>
        {`${label}`}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, validationSchema)}
        className={`
        focus:outline-none"
          aria-label="Full 
          name" 
          w-full
          appearance-none 
          border-none 
          bg-transparent 
          px-2
          py-1 
          text-base 
          leading-tight 
          text-white     
          focus-within:outline-none
          ${errors?.[name] ? 'border-red-700' : 'border-neutral-500'}
          ${errors?.[name] ? 'focus:border-red-700' : 'focus:border-black'}
        `}
      />
      {errors?.[name] && (
        <small className='text-xs text-red-600'>
          {errors?.[name]?.message as string}
        </small>
      )}
    </div>
  );
};
