import {SortType} from '../const';
import dayjs from 'dayjs';
import {getDiffFromDates} from './date';

const sortByType = {
  [SortType.DAY]: (tripA, tripB) => dayjs(tripA.dateFrom) - dayjs(tripB.dateFrom),
  [SortType.PRICE]: (tripA, tripB) => tripB.basePrice - tripA.basePrice,
  [SortType.TIME]: (tripA, tripB) => getDiffFromDates(tripB.dateTo, tripB.dateFrom) - getDiffFromDates(tripA.dateTo, tripA.dateFrom),
};

const sortDate = (dateA, dateB) => dayjs(dateA) - dayjs(dateB);

export {sortByType, sortDate};
