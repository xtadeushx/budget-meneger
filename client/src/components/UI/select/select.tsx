import { TSelectProps } from './types';
import { v4 as uuidv4 } from 'uuid';
const Select = ({
  name,
  title,
  optionList = [],
  value,
  onchange,
  ...rest
}: TSelectProps) => {
  return (
    <label className='grid'>
      {title}
      <select
        value={value}
        name={name}
        onChange={onchange}
        {...rest}
        className="bg-transparent border bg-slate-700  border-slate-700 rounded-md outline-none placeholder:text-white/50"
      >
        {optionList.map((el) => {
          return (
            <option key={uuidv4()} value={el.title} className='bg-slate-700 capitalize'>
              {el.title}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export { Select };
