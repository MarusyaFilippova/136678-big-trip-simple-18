import dayjs from 'dayjs';
import { FilterType } from '../const';

const isFutureTrip = (dateFrom, dateTo) => dateFrom && dayjs(dateFrom).isAfter(dayjs(), 'd') || dateTo && dayjs(dateTo).isAfter(dayjs(), 'd') || dateFrom && dayjs(dateFrom).isSame(dayjs(), 'd') || dateTo && dayjs(dateTo).isSame(dayjs(), 'd');
const isPastTrip = (dateFrom, dateTo) => dateFrom && dayjs(dateFrom).isBefore(dayjs(), 'd') || dateTo && dayjs(dateTo).isBefore(dayjs(), 'd');

const filterByType = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.PAST]: (trips) => trips.filter(({dateFrom, dateTo}) => isPastTrip(dateFrom, dateTo)),
  [FilterType.FUTURE]: (trips) => trips.filter(({dateFrom, dateTo}) => isFutureTrip(dateFrom, dateTo)),
};

export { filterByType };
