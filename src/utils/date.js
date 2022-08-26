import dayjs from 'dayjs';

const getDiffFromDates = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom));

const formatDate = (date, format = 'YYYY-MM-DD') => date ? dayjs(date).format(format) : '';
const formatTime = (date, format = 'H:mm') => date ? dayjs(date).format(format) : '';

export {formatDate, formatTime, getDiffFromDates};
