import { ICategoryItem } from '../../../pages/categories/types';

export type TSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  optionList: ICategoryItem[];
  value?: string;
  onchange?: () => void;
  title: string;
};
