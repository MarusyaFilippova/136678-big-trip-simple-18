import dayjs from 'dayjs';
import {formatDate} from './date';

const getStartPoint = (trips) => [...trips].sort((tripA, tripB) => dayjs(tripA.dateFrom) - dayjs(tripB.dateFrom))[0];
const getEndPoint = (trips) => [...trips].sort((tripA, tripB) => dayjs(tripA.dateTo) - dayjs(tripB.dateTo))[trips.length - 1];

const formatTripDates = (startDate, endDate) => `${formatDate(startDate, 'D MMM')} — ${formatDate(endDate, 'D MMM')}`;

const formatDuration = (days, hours, minutes) => {
  let duration = '';

  if (days > 0) {
    duration += `${days}D `;
  }

  if (hours > 0 || days > 0) {
    duration += hours > 9 ? `${hours}H ` : `0${hours}H `;
  }

  duration += minutes > 9 ? `${minutes}M` : `0${minutes}M`;

  return duration;
};

const getTripDuration = (dateFrom, dateTo) => {
  const formattedDateFrom = dayjs(dateFrom).set('second', 0);
  const formattedDateTo = dayjs(dateTo).set('second', 0);

  const diffDay = dayjs(formattedDateTo).diff(dayjs(formattedDateFrom), 'day', true);
  const diffHour = dayjs(formattedDateTo).diff(dayjs(formattedDateFrom), 'hour', true);

  const days = Math.floor(diffDay);
  const hours = Math.floor(diffHour - (days * 24));
  const minutes = Math.floor((diffHour - (days * 24) - hours) * 60);

  return formatDuration(days, hours, minutes);
};

export { getStartPoint, getEndPoint, getTripDuration, formatTripDates };
