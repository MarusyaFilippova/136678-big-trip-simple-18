import dayjs from 'dayjs';
import { getDiffFromDates } from './date';
import { SortType } from '../const';

const sortTripByDay = (tripA, tripB) => dayjs(tripA.dateFrom) - dayjs(tripB.dateFrom);
const sortTripByPrice = (tripA, tripB) => tripB.basePrice - tripA.basePrice;
const sortTripByTime = (tripA, tripB) => getDiffFromDates(tripB.dateTo, tripB.dateFrom) - getDiffFromDates(tripA.dateTo, tripA.dateFrom);

const SortColumn = {
  [SortType.DAY]: {
    type: SortType.DAY,
    sort: sortTripByDay,
  },
  [SortType.EVENT]: {
    type: SortType.EVENT,
    sort: () => {},
    disabled: true,
  },
  [SortType.TIME]: {
    type: SortType.TIME,
    sort: sortTripByTime,
  },
  [SortType.PRICE]: {
    type: SortType.PRICE,
    sort: sortTripByPrice,
  },
  [SortType.OFFERS]: {
    type: SortType.OFFERS,
    sort: () => {},
    disabled: true,
  },
};

const sortByDate = (dateA, dateB) => dayjs(dateA) - dayjs(dateB);

export {sortTripByDay, sortTripByTime, sortTripByPrice, sortByDate, SortColumn};
