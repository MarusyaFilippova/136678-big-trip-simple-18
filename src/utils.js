import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const getDuration = (dateFrom, dateTo) => {
  const formattedDateFrom = dayjs(dateFrom).set('second', 0);
  const formattedDatTo = dayjs(dateTo).set('second', 0);

  const diffDay = dayjs(formattedDatTo).diff(dayjs(formattedDateFrom), 'day', true);
  const diffHour = dayjs(formattedDatTo).diff(dayjs(formattedDateFrom), 'hour', true);

  const days = Math.floor(diffDay);
  const hours = Math.floor(diffHour - (days * 24));
  const minutes = Math.floor((diffHour - (days * 24) - hours) * 60);

  return formatDuration(days, hours, minutes);
};

const getFormattedDate = (date, format = 'YYYY-MM-DD') => date ? dayjs(date).format(format) : '';
const getFormattedTime = (date, format = 'HH:mm') => date ? dayjs(date).format(format) : '';

const shuffleElements = (elements) => elements.sort(() => Math.random() - 0.5);

export {getDuration, getFormattedDate, getFormattedTime, getRandomElement, getRandomInteger, shuffleElements};
