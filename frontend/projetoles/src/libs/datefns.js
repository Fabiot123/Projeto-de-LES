import { format, parseISO } from 'date-fns';

export const formatDate = (date, pattern = 'dd/MM/yyyy') => {
  try {
    return format(parseISO(date), pattern);
  } catch {
    return date;
  }
};