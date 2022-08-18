import es from 'date-fns/locale/es';
import { formatDistanceToNow } from 'date-fns';

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date, { locale: es });
  return `hace ${fromNow}`;
};
