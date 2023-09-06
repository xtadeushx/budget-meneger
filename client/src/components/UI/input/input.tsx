import { FC } from 'react';

import { TInputProps } from './types';


const Input: FC<TInputProps> = ({
  name,
  type = 'text',
  required = true,
  value,
  onChange,
  text,
  ...rest
}) => {
  return (
    <label htmlFor={name} className='flex flex-col'>
      {text}
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="bg-transparent border bg-slate-700  border-slate-700 rounded-md outline-none placeholder:text-white/50"
        {...rest}
      />
    </label>
  );
};

export { Input };
