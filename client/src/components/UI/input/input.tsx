import clsx from 'clsx';
import { TInputProps } from './types';

const Input: React.FC<TInputProps> = ({
  name,
  type = 'text',
  required = true,
  value,
  onChange,
  text,
  className = '',
  ...rest
}) => {
  return (
    <label
      htmlFor={name}
      className='flex flex-col'>
      {text}
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={
          clsx("bg-transparent border bg-slate-700  border-slate-700 rounded-md outline-none placeholder:text-white/50", className)}
        {...rest}
      />
    </label>
  );
};

export { Input };
