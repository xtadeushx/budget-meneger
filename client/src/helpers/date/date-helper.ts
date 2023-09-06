import { MONTHS } from '../../common/constant/constant';

const formatDateLong = (date: Date): string => {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();

  const formattedDate = `${MONTHS[monthIndex]}, ${day} ${year}`;
  return formattedDate;
};

const formatDateShort = (date: string): string => {
  const foo = new Date(date);
  const year = foo.getFullYear();
  const month = foo.getMonth() + 1;
  const day = foo.getDate();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

export { formatDateLong, formatDateShort };
