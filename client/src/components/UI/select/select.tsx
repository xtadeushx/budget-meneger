import { TSelectProps } from './types';
const Select = ({
  name,
  title,
  optionList = [],
  value,
  onChange,
  ...rest
}: TSelectProps) => {
  return (
    <label className='grid'>
      {title}
      <select
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
        className="bg-transparent border bg-slate-700  border-slate-700 rounded-md outline-none placeholder:text-white/50"
      >
        {optionList.map((el) => {
          return (
            <option key={el.id} value={el.title} className='bg-slate-700 capitalize'>
              {el.title}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export { Select };
