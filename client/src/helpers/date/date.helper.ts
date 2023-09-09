export const formateDate = (date: string) => {
  let result = '';
  if (Date.parse(date)) {
    result = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      day: 'numeric',
      month: 'long',
    });
  } else {
    result = '';
  }
  return result;
};
