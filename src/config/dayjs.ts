import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

// Initialize plugins
dayjs.extend(relativeTime);

export const configureDayjs = (locale: string) => {
  dayjs.locale(locale);
};

export default dayjs;
