import { ICategoryItem } from '../../../pages/categories/types';

export type TSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  optionList: ICategoryItem[];
  value?: string;
  onchange?: (e: Event) => void;
  title: string;
};
